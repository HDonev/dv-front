// get text for cod from hiera(jsonData)
const findTextByCodFromStorage = (jsonData, searchCode) => {
    if (!Array.isArray(jsonData.row)) {
        jsonData.row = [jsonData.row];
    }
    let foundedText = '';
    $.each(jsonData.row, function () {
        if (this.cod_z !== undefined && this.ime_z !== undefined) {
            if (this.cod_z + '' === searchCode + '') {
                foundedText = this.ime_z;
            } else {
                if (this.hasOwnProperty('row')) {
                    foundedText = findTextByCodFromStorage(this, searchCode + '');
                } else {
                    if (foundedText = '') {
                        foundedText = 'NOT FOUND!';
                    }
                }
            }
        }
        if (foundedText != '') {
            return false;
        }
    });
    return foundedText;
}

//decode ulica cod in text
async function ulDecodeCod(ul_cod) {
    var url = localStorage.getItem('ulici_dec');
    url = url.replace('ul_cod', ul_cod);

    return await fetch(url).then((resp) => {
        if (resp.ok) {
            return resp;
        }
        throw new Error('err');
    }).then(async (resp) => {
        const data = await resp.json();
        return data;
    }).catch((err) => {
        return '';
    });

    //use ulDecodeCod(ul_cod).then(data => do something)
}

//decode value by given table
const decodeByOsiTablAndVal = async (table, cod_z) => {
    //check for geted hiera in localStorage

    // TO BY REMOVED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let retunData;
    $.each(Object.entries(localStorage), function () {
        if (this[0] === table) {
            retunData = findTextByCodFromStorage(JSON.parse(this[1]).hiera, cod_z);
        }
        if (retunData) {
            return false;
        }
    });
    //END TO BE REMOVED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (retunData === undefined) {

        var url = isInContainer ? location.origin + "/osi/rest/decode/" + table + "/" + cod_z : "https://appps.mvr.bg/osi/rest/decode/" + table + "/" + cod_z;
        const response = await fetch(url).then((resp) => {
            if (resp.ok) {
                return resp;
            }
            throw new Error('err');
        }).then(async (resp) => {
            const data = await resp.text();
            retunData = data;
        }).catch((err) => {
            retunData = '';
        });

    };
    return retunData;
    //use decodeByOsiTablAndVal(table, cod_z).then(data => do something)
}

const setAddressEknmUlica = async (targetEknm, codEknm, codUl) => {
    $('#' + targetEknm).find('button > input').one('change', function () {
        //get hiera 
        let useHieraForOperation = $(this).parent().attr('use-hiera');
        $('[dependant-on=' + targetEknm + ']').each(function () {
            if ($(this).attr('use-hiera') !== undefined) {
                useHieraForOperation = $(this).attr('use-hiera');
            } else {
                $(this).attr('use-hiera', useHieraForOperation);
                $(this).attr('use-hiera-isadded', '');
            }

            //ako e eknm ierarhiqta
            if (useHieraForOperation === 'eknm') {
                let hieraEknm = JSON.parse(localStorage.getItem(useHieraForOperation));
                //  hieraEknm = hieraEknm.hiera;
                //za oblast
                if ($(this).attr('id').indexOf('Obl') > -1) {
                    setObl($(this), hieraEknm, codEknm);
                }
                //za obshtina
                if ($(this).attr('id').indexOf('Obs') > -1) {
                    setObs($(this), hieraEknm, codEknm);
                }
            }
            //ako ierarhiqta e za ulici
            if (useHieraForOperation === "ulici_hie") {
                setUliciHieraStoinost($(this), codEknm, codUl);
            }
        });
    });
    setEknm(targetEknm, codEknm);
}

//sete eknm val and text in dropdown for eknm
function setEknm(target, eknm) {
    $('#' + target).find('span[cod_z="' + eknm + '"]').click();
}

//set obshina, depends on selected eknm
function setObs(target, hiera, eknm) {
    let findItem = jsonTraversFromCurrenPos(hiera, eknm, 1)
    //find value 1 level up from searchForVal
    $(target).val(findItem.ime_z);
    $(target).attr('cod_z', findItem.cod_z);
}
//set oblist, depends on selected eknm
function setObl(target, hiera, eknm) {
    let findItem = jsonTraversFromCurrenPos(hiera, eknm, 2)
    //find value 2 level up from searchForVal
    $(target).val(findItem.ime_z);
    $(target).attr('cod_z', findItem.cod_z);
}


function getJsonItemOneLvlUp(target, hiera, baseLvlCod) {
    setObs(target, hiera, baseLvlCod);
}

//get ulici for selected eknm and if has codUlica param - set it! 
function setUliciHieraStoinost(target, eknm, ulCode) {
    // target.empty();
    let $selectedTag = $(target);

    if (ulCode === undefined || ulCode === '' || ulCode === 0) {
        $selectedTag.find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
        $selectedTag.find('input[type="hidden"]').val('');
        $selectedTag.parent().find('.option-tree').children('ul').html('');
        $selectedTag.parent().find('.option-tree').children('input').val('').trigger('keyup');
    } else {
       
            //ulici
         ulGetHiera(eknm).then(function (data) {
            if ($selectedTag.parent().find('.option-tree').find('span[cod_z="' + ulCode + '"]').length === 1) {
                $selectedTag.parent().find('.option-tree').find('span[cod_z="' + ulCode + '"]').click();
            }
            else {
                $selectedTag.find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
                $selectedTag.find('input[type="hidden"]').val('');
                $selectedTag.parent().find('.option-tree').children('ul').html('');
                $selectedTag.parent().find('.option-tree').children('input').val('').trigger('keyup');
            }
         });
    }

}


//get hiera for ulici by eknm code
const ulGetHiera = async (eknm) => {
    var url = localStorage.getItem('ulici_hie');
    url = url.replace('eknm_cod', eknm);
    return await fetch(url).then((resp) => {
        if (resp.ok) {
            return resp;
        }
        throw new Error('err');
    }).then(async (resp) => {
        const data = await resp.json();
        return data;
    }).catch((err) => {
        return '';
    });
    //use ulGetHiera().then(data => do something)
}

//decode from tag id and cod. in html must have attr <use-hiera="ierarhiq_koqto_se_polzva">
function hiera_decode(target, value_forDecode) {
    let hieras = $(target).attr('use-hiera') !== undefined ? $(target).attr('use-hiera').split(',') : [''];
    if (hieras.filter(e => e !== '').length == 0) {
        hieras = [];
        hieras.push(target);
    }
    for (var hiera of hieras) {
        let hieraData = JSON.parse(localStorage.getItem(hiera));
        return findTextByCodFromStorage(hieraData.hiera, value_forDecode);
    }
}

//function for go up in json hiera and return json object
function jsonTraversFromCurrenPos(hiera, searchForVal, level) {
    let currentLevel = 0;
    let startItem;
    hiera = hiera.hiera;
    if (!Array.isArray(hiera.row)) {
        hiera.row = [hiera.row];
    }

    //added level in json
    const jsonLeveled = function (hier, curLvl, parentcode) {
        $.each(hier.row, function (i, item) {

            item.levelh = curLvl;
            item.parentcod = parentcode;
            if (item.hasOwnProperty('row')) {
                if (!Array.isArray(item.row)) {
                    item.row = [item.row];
                }
                curLvl += 1;
                jsonLeveled(item, curLvl, item.cod_z);
                curLvl -= 1;
            }
            if (item.cod_z + '' === searchForVal + '') {
                startItem = item;
            }
        });
        return hier;
    };
    hiera = jsonLeveled(hiera, currentLevel, hiera.cod_z1);

    const jsonParentRootOnLevel = function (hier, itemLevel, searchForVal) {
        let itemF;
        $.each(hier.row, function (i, item) {
            if (item.hasOwnProperty('row')) {
                if (item.cod_z === searchForVal) {
                    if (startItem.levelh - level !== item.levelh) {
                        searchForVal = item.parentcod;
                        itemF = jsonParentRootOnLevel(hiera, startItem.levelh, searchForVal);
                    } else {
                        itemF = item
                    }
                } else {
                    itemF = jsonParentRootOnLevel(item, item.levelh, searchForVal);
                }
                if (itemF !== undefined) {
                    return false;
                }
            }
        });
        return itemF;
    };

    let foundLvlItem
    if (level <= 0) {
        foundLvlItem = startItem;
    } else {
        foundLvlItem = jsonParentRootOnLevel(hiera, startItem.levelh, startItem.parentcod);
    }

    return foundLvlItem;

}