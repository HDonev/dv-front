//$('[class*="address-"][class*="person-"]')
let classesForFind = ['address-', 'person-'];
let classesForPersonBase = ['person-base'];
let classesForAllAddresses = ['address-'];
let classesForPermAddress = ['address-perm'];
let classesForPresentAddress = ['address-present'];
let classesForCurrAddress = ['address-curr'];
//namira kolekciq ot elementi ot klasove ili chast ot tqh
function findCollectionOfData(classesOrPartOfThem) {
    let createStringForElements = '';
    for (const classPart of classesOrPartOfThem) {
        createStringForElements += `[class*="${classPart}"]`;
    }

    let foundedElement = $(createStringForElements).map(function () { return $(this); }).get();
    return foundedElement;
}

function setDataByKey(objTemplateKeyId, collectionToGetFrom, idRepitablePrefix) {
    if (idRepitablePrefix === undefined) {
        idRepitablePrefix = "";
    }
    Object.keys(objTemplateKeyId).forEach(function (key) {
        var item = objTemplateKeyId[key];
        if (item.indexOf('.') > 0) {
            item = item.split('.');
        }
        // console.log(item);
        // console.log(item instanceof Array);
        $.each(collectionToGetFrom, function () {
            let $checkeElement = $(this);
            if ($($checkeElement)[0].nodeName.toLowerCase() === 'button') {
                $checkeElement = $(this).parent('div');
                
            }
            if (item !== undefined && item.length > 0) {
                if (!(item instanceof Array)) {
                    if ($($checkeElement).attr('id') === idRepitablePrefix + item) {
                        if ($($checkeElement)[0].classList.contains('dropdown')) {
                            if ($($checkeElement).children('button').find('span').attr('cod_z') === undefined){
                                return false;
                            }
                            objTemplateKeyId[key] = $($checkeElement).children('button').find('span').attr('cod_z');

                        } else if ($($checkeElement)[0].nodeName.toLowerCase() === 'select'){
                            if ($('#'+$($checkeElement).attr('id')+' option:selected').length > 0){
                                objTemplateKeyId[key] = $('#'+$($checkeElement).attr('id')+' option:selected').val();
                            }
                        }else {
                            objTemplateKeyId[key] = $($checkeElement).val();
                        }
                    }
                } else {
                    if ($($checkeElement).attr('id') === idRepitablePrefix + item[0]) {
                        if ($($checkeElement)[0].classList.contains('dropdown')) {
                            if ($($checkeElement).children('button').find('span').attr('cod_z') === undefined){
                                return false;
                            }
                            objTemplateKeyId[key] = $($checkeElement).children('button').find('span').attr('cod_z');
                        }
                        if($($checkeElement)[0].nodeName.toLowerCase() === 'select'){
                            if ($('#'+$($checkeElement).attr('id')+' option:selected').length > 0){
                                objTemplateKeyId[key] = $('#'+$($checkeElement).attr('id')+' option:selected').attr(item[1]);
                            }

                        }
                        if ($($checkeElement).attr(item[1]) !== undefined && $($checkeElement).attr(item[1]).length > 0) {
                            objTemplateKeyId[key] = $($checkeElement).attr(item[1]);
                        }

                    }
                }
            }
        });

    });
}
//get base person data
function addDataForPerson() {
    let personBase = findCollectionOfData(classesForPersonBase);
    let personAddresses = [];
    let personObject = {
        "TYPE_OBJECT": "personNationality.type_person",
        "sid_o": "personIdegn.sid",
        "pnr_o": "personIdegn.pnr",
        "pol": "personSex.cod_z",
        "dat_vav": "2023-11-07",
        "mrk_akt": "Y",
        "operation": "",
        "ime": "personIme",
        "prezime": "personPrezIme",
        "familno": "personFamilno",
        "egn": "personId"
    };
    setDataByKey(personObject, personBase);

    personAddresses = addDataForAddresses(classesForAllAddresses);
    personObject["personAddresses"] = personAddresses;
    //console.log(personObject);
    if (sessionStorage.getItem('persons_add') === null) {
        sessionStorage.setItem('persons_add', JSON.stringify(personObject));
    } else {
        let persons_add = JSON.parse(sessionStorage.getItem('persons_add'));
        //masiva e s length = 1 pri parse na JSON go pravi kato obekt, a ne kato array
        if (!(Array.isArray(persons_add))) {
            persons_add = [persons_add];
        }
        //check for existing person
        let isPersonAddedInArray = false;
        $(persons_add).each(function () {
            if (personObject.sid_o * 1 === this.sid_o * 1) {
                isPersonAddedInArray = true;
                return false;
            }
        });
        //not exist
        if (!isPersonAddedInArray) {
            persons_add.push(personObject);
            sessionStorage.removeItem('persons_add');
            sessionStorage.setItem('persons_add', JSON.stringify(persons_add));
        } else { //exist person
            $(persons_add).each(function () {
                if (this.sid_o * 1 === personObject.sid_o * 1) {
                    persons_add.splice(this);
                    return false;
                }
            });
            persons_add.push(personObject);
            sessionStorage.removeItem('persons_add');
            sessionStorage.setItem('persons_add', JSON.stringify(persons_add));
        }
    }
}

function addDataForAddresses(classesForAddresses) {
    let addressesCollection = findCollectionOfData(classesForAddresses);
    // let addressPermCollection = findCollectionOfData(classesForPermAddress);
    // let addressPresentCollection = findCollectionOfData(classesForPresentAddress);
    //console.log(addressesCollection);
    let personAddresses = [];
    let personAddress = function () {
        return {
            "eknm": "Eknm.cod_z",
            "kod_ul": "Ulica.cod_z",
            "nomer": "Nom",
            "vhod": "Vhod",
            "mrk_akt": "Y",
            "dat_vav": "2023-11-07",
            "operation": ""
        };
    };
    let fdv = function () {
        return {
            "fact": "",
            "cod_t": "17",
            "rol_o": "Address.type_address"
        };
    };
    let fadDop = function () {
        return {
            "sid_f": "",
            "pnr_f": "",
            "pod_adr": "",
            "vid_adr": "Address.type_address",
            "etaj": "Etaj",
            "apart": "Apart",
            "mrk_akt": "Y",
            "opisanie": "",
            "operation": ""
        };
    };
    $.each(addressesCollection, function () {
        if ($(this).attr('type_address') != undefined) {
            let foundedclass;
            let repitablePrefixId;
            let persAdr = new personAddress();

            let fd = new fdv();
            let fdp = new fadDop();
            $.each($(this)[0].classList, function (ind, elem) {

                if (elem.indexOf('address-') > -1) {
                    foundedclass = elem;
                    return false;
                }
            });
            repitablePrefixId = $(this).attr('id') !== undefined ? $(this).attr('id').replace('Address', '') : "";
            let separateAddress = findCollectionOfData([foundedclass]);
            setDataByKey(persAdr, separateAddress, repitablePrefixId);
           
            if (persAdr.eknm === new personAddress().eknm) {
                return false;
            }
            $.each(Object.keys(persAdr), function(key,val){
                if(persAdr[val] === new personAddress()[val]){
                    persAdr[val] = "";
                }
            });
            // console.log('persAdr keys:' +Object.keys(persAdr))
            // console.log('new personAddress() keys:' +Object.keys(new personAddress()))

            setDataByKey(fd, separateAddress, repitablePrefixId);
            setDataByKey(fdp, separateAddress, repitablePrefixId);
            persAdr["fdv"] = fd;
            persAdr["fadDop"] = fdp;
            personAddresses.push(persAdr);
        }
    });
    return personAddresses;




    // let personAddresses = [];
    // let personAddress = {
    //     "eknm": "",
    //     "kod_ul": "",
    //     "nomer": "",
    //     "vhod": "",
    //     "mrk_akt": "Y",
    //     "dat_vav": "2023-11-07",
    //     "operation": 0
    // };
    // let fdv = {
    //     "fact": 22,
    //     "cod_t": 17,
    //     "rol_o": 5030
    // };
    // let fadDop = {
    //     "sid_f": 0,
    //     "pnr_f": 0,
    //     "pod_adr": 366,
    //     "vid_adr": 5030,
    //     "etaj": "",
    //     "apart": "",
    //     "mrk_akt": "Y",
    //     "opisanie": null,
    //     "operation": 0
    // }


    // $('.address-perm').each(function () {
    //     console.log($(this).attr('id') + "" + $(this).val());
    //     if ($(this).attr('id') === "personPermEknm") {
    //         personAddress["eknm"] = $(this).attr('cod_z');
    //     }
    //     if ($(this).attr('id') === "personPermUlica") {
    //         personAddress["kod_ul"] = $(this).attr('cod_z');
    //     }
    //     if ($(this).attr('id') === "personPermNom") {
    //         personAddress["nomer"] = $(this).val();
    //     }

    //     if ($(this).attr('id') === "personPermVhod") {
    //         personAddress["vhod"] = $(this).val();
    //     }

    //     if ($(this).attr('id') === "personPermEtaj") {
    //         fadDop["etaj"] = $(this).val();
    //     }
    //     if ($(this).attr('id') === "personPermApart") {
    //         fadDop["apart"] = $(this).val();
    //     }
    // });

    // personAddress["fdv"] = fdv;
    // personAddress["fadDop"] = fadDop;
    // personAddresses.push(personAddress);
    // console.log(personAddresses);

}

function findAddedPersonDataInStorage(personSid, personPnr) {
    let persons_arr = JSON.parse(sessionStorage.getItem('persons_add'));
    if (!(Array.isArray(persons_arr))) {
        persons_arr = [persons_arr];
    }
    let personObject = {};
    $(persons_arr).each(function () {
        if (this.sid_o * 1 === personSid * 1) {
            personObject = this;
            return false;
        }
    });
    return personObject;
}

//========================== in other file?
//array person confurmed persons
let personsArray = [];

//for those where have id
// $.each($('.person-other'), function (idx, item) { 
//     console.log('id: ' + $(item).attr('id') + ', val:' + $(item).val()); 
// })
//for comunication point
// $.each($('.person-other.person-slovesno'), function (idx, item) { 
//     console.log('id: ' + $(item).attr('cod_z') + ', val:' + $(item).attr('value'));
// })

function getDataForInsUpd() {
    let personAddresses = [];
    let personAddress = {
        "eknm": 5345,
        "kod_ul": 5013,
        "nomer": "16",
        "mrk_akt": "Y",
        "dat_vav": "2023-11-07",
        "operation": 0
    };
    let fdv = {
        "fact": 22,
        "cod_t": 17,
        "rol_o": 5030
    };
    let fadDop = {
        "sid_f": 0,
        "pnr_f": 0,
        "pod_adr": 0,
        "vid_adr": 0,
        "etaj": "7",
        "apart": "27",
        "mrk_akt": "Y",
        "opisanie": "",
        "operation": 0
    }
    personAddress["fdv"] = fdv;
    personAddress["fadDop"] = fadDop;
    let personObject = {
        "TYPE_OBJECT": "1",
        "sid_o": 8861585001,
        "pnr_o": 1,
        "pol": 0,
        "dat_vav": "2023-11-07",
        "mrk_akt": "Y",
        "operation": 1,
        "ime": "АТАНАС",
        "prezime": "НЕДЕЛЧЕВ",
        "familno": "КОСТОВ",
        "egn": "8209225566"
    };
    personAddresses.push(personAddress);
    personObject["addresses"] = personAddresses

    personsArray.push(personObject);
    console.log(JSON.stringify(personsArray));
}