async function loadSrvPersonData(person) {
    let typePerson;
    if (person.TYPE_OBJECT * 1 === 2 && (person.egn === undefined && person.enc === undefined)) {
        typePerson = -1;
    } else {
        typePerson = person.TYPE_OBJECT * 1;
    }
    if (typePerson * 1 === 1) {
        $('#modalConfirmPerson').find('.person-cuz').hide();
        $('#modalConfirmPerson').find('.person-noid').hide();
        $('#modalConfirmPerson').find('.person-bg').show();
        $('#modalConfirmPerson').find('.person-bg').removeClass('col-md-6');
    }
    if (typePerson * 1 === 2) {
        $('#modalConfirmPerson').find('.person-bg').hide();
        $('#modalConfirmPerson').find('.person-noid').hide();
        $('#modalConfirmPerson').find('.person-cuz').show();
        $('#modalConfirmPerson').find('.column-6').addClass('col-md-6');
    }

    if (typePerson * 1 === -1) {
        $('#modalConfirmPerson').find('.person-bg').hide();
        $('#modalConfirmPerson').find('.person-cuz').hide();
        $('#modalConfirmPerson').find('.person-noid').show();
    }

    if (typePerson * 1 === 1) { //bg
        $('input[type=radio][name=groupSearchByNationality][id=bgNationality]').prop('checked', true);
        if (person.egn !== null) {
            //set image
            if (person.photo !== undefined && person.photo !== "") {
                $('#modalConfirmPerson img.img-thumbnail').attr('src', 'data:image/png;base64,' + person.photo.photo);
            } else {
                $('#modalConfirmPerson img.img-thumbnail').attr('src', "../assets/img/no_image.jpg")
            }
            //set names
            $('#modalConfirmPerson #personIme').val(person.ime);
            $('#modalConfirmPerson #personPrezIme').val(person.prezime);
            $('#modalConfirmPerson #personFamilno').val(person.familno);
            $('#modalConfirmPerson #personNames').val(person.ime + ' ' + person.prezime + ' ' + person.familno);
            //set EGN and other important id
            $('#modalConfirmPerson #personIdegn').val(person.egn);
            $('#modalConfirmPerson #personIdegn').attr('sid', person.sid_o);
            $('#modalConfirmPerson #personIdegn').attr('pnr', person.pnr_o);
            $('#modalConfirmPerson #personIdegn').attr('typep', person.TYPE_OBJECT);
            //set Pol
            let polPerson = getPolFromEgn(person.egn) * 1;
            $('#modalConfirmPerson #personSex').attr('cod_z', polPerson);
            $('#modalConfirmPerson #personSex').val(polPerson);
            //setAge
            $('#modalConfirmPerson #personAge').val(getAgeFromEgn(person.egn));
            //setNationality
            $('#modalConfirmPerson #personNationality').val(6067);
            $('#modalConfirmPerson #personNationality').attr('cod_z', 6067).attr('type_person', person.TYPE_OBJECT);
            $('#modalConfirmPerson #dateBirthDay').val(getBirthDayFromEgn(person.egn));
        }

    } else if (typePerson * 1 === 2) { //cuz with id
        $('input[type=radio][name=groupSearchByNationality][id=fgNationality]').prop('checked', true);
        if (person.egn !== undefined || person.enc !== undefined) {
            //set image
            if (person.photo !== undefined && person.photo !== "") {
                $('#modalConfirmPerson img.img-thumbnail').attr('src', 'data:image/png;base64,' + person.photo.photo);
            } else {
                $('#modalConfirmPerson img.img-thumbnail').attr('src', "../assets/img/no_image.jpg")
            }
            //set names
            $('#modalConfirmPerson #fgnNameLatin').val(person.imena);

            $('#modalConfirmPerson #fgnNameCirilic').val(person.imek);
            //set EGN and other important id
            $('#modalConfirmPerson #personIdegn').val(person.egn);
            $('#modalConfirmPerson #personIdenc').val(person.enc);
            $('#modalConfirmPerson #personIdegn').attr('sid', person.sid_o);
            $('#modalConfirmPerson #personIdegn').attr('pnr', person.pnr_o);
            $('#modalConfirmPerson #personIdegn').attr('typep', person.TYPE_OBJECT);
            //set Pol
            let polPerson = person.pol;
            $('#modalConfirmPerson #personSex').attr('cod_z', polPerson);
            $('#modalConfirmPerson #personSex').val(polPerson);
            //setDateOfBirth
            $('#modalConfirmPerson #dateBirthDay').val(person.datRaj);
            //setAge
            $('#modalConfirmPerson #personAge').val(getAgeFromBirthDay(person.datRaj));
            //setNationality
            $('#modalConfirmPerson #personNationality').val(person.graj);
            $('#modalConfirmPerson #personNationality').attr('cod_z', person.graj).attr('type_person', person.TYPE_OBJECT);
            //vid dokument
            $('#modalConfirmPerson #typeDocFgn').val(person.vidDok);
            // nomer na dokument
            $('#modalConfirmPerson #numDocFgn').val(person.nacPasp);
            //data na izdavane na dokument
            $('#modalConfirmPerson #issueDateDocFgn').val(person.datIzd);
            //srok na validnost
            $('#modalConfirmPerson #exDateDocFgn').val(person.datVal);
        }
    } else {
        $('input[type=radio][name=groupSearchByNationality][id=fgWithoutID]').prop('checked', true);
        $('#modalConfirmPerson img.img-thumbnail').attr('src', "../assets/img/no_image.jpg")

        //set names
        $('#modalConfirmPerson #fgnNameLatin').val(person.imena);

        $('#modalConfirmPerson #fgnNameCirilic').val(person.imek);
        //set EGN and other important id
        $('#modalConfirmPerson #personIdegn').attr('sid', person.sid_o);
        $('#modalConfirmPerson #personIdegn').attr('pnr', person.pnr_o);
        $('#modalConfirmPerson #personIdegn').attr('typep', -1);
        //set Pol
        let polPerson = person.pol;
        $('#modalConfirmPerson #personSex').attr('cod_z', polPerson);
        $('#modalConfirmPerson #personSex').val(polPerson);
        //setDateOfBirth
        $('#modalConfirmPerson #dateBirthDay').val(person.datRaj);
        //setAge
        $('#modalConfirmPerson #personAge').val(getAgeFromBirthDay(person.datRaj));
        //setNationality
        $('#modalConfirmPerson #personNationality').val(person.graj);
        $('#modalConfirmPerson #personNationality').attr('cod_z', person.graj).attr('type_person', person.TYPE_OBJECT);
        //vid dokument
        $('#modalConfirmPerson #typeDocFgn').val(person.vidDok);
        // nomer na dokument
        $('#modalConfirmPerson #numDocFgn').val(person.nacPasp);
        //data na izdavane na dokument
        $('#modalConfirmPerson #issueDateDocFgn').val(person.datIzd);
        //srok na validnost
        $('#modalConfirmPerson #exDateDocFgn').val(person.datVal);
    }

}


async function setBasePersonData(typePerson, personFound, showConfurm) {
    let isPersonFound = false;
    if (typePerson * 1 === 1) {
        $('#modalConfirmPerson').find('.person-cuz').hide();
        $('#modalConfirmPerson').find('.person-noid').hide();
        $('#modalConfirmPerson').find('.person-bg').show();
        $('#modalConfirmPerson').find('.person-bg').removeClass('col-md-6');
    }
    if (typePerson * 1 === 2) {
        $('#modalConfirmPerson').find('.person-bg').hide();
        $('#modalConfirmPerson').find('.person-noid').hide();
        $('#modalConfirmPerson').find('.person-cuz').show();
        $('#modalConfirmPerson').find('.column-6').addClass('col-md-6');
    }

    $.each(personStorage.addPerson(personFound), function (num, person) { //uncomment for test BDS
        if (person.sid_o === personFound.sid_o) {
            if (typePerson * 1 === 1) { //bg

                if (personFound.egn === person.egn && typePerson === person.TYPE_OBJECT * 1) {
                    //set image
                    if (person.photo !== undefined && person.photo !== "") {
                        $('#modalConfirmPerson img.img-thumbnail').attr('src', 'data:image/png;base64,' + person.photo.photo);
                    } else {
                        $('#modalConfirmPerson img.img-thumbnail').attr('src', "../assets/img/no_image.jpg")
                    }
                    //set names
                    $('#modalConfirmPerson #personIme').val(person.ime);
                    $('#modalConfirmPerson #personPrezIme').val(person.prezime);
                    $('#modalConfirmPerson #personFamilno').val(person.familno);
                    $('#modalConfirmPerson #personNames').val(person.ime + ' ' + person.prezime + ' ' + person.familno);
                    //set EGN and other important id
                    $('#modalConfirmPerson #personIdegn').val(person.egn);
                    $('#modalConfirmPerson #personIdegn').attr('sid', person.sid_o);
                    $('#modalConfirmPerson #personIdegn').attr('pnr', person.pnr_o);
                    $('#modalConfirmPerson #personIdegn').attr('typep', person.TYPE_OBJECT);
                    //set Pol
                    let polPerson = getPolFromEgn(person.egn) * 1;
                    $('#modalConfirmPerson #personSex').attr('cod_z', polPerson);
                    $('#modalConfirmPerson #personSex').val(polPerson);
                    //setAge
                    $('#modalConfirmPerson #personAge').val(getAgeFromEgn(person.egn));
                    //setNationality
                    $('#modalConfirmPerson #personNationality').val(6067);
                    $('#modalConfirmPerson #personNationality').attr('cod_z', 6067).attr('type_person', person.TYPE_OBJECT);
                    $('#modalConfirmPerson #dateBirthDay').val(getBirthDayFromEgn(person.egn));
                }
            } else if (typePerson * 1 === 2) { //cuz with id
                if ((personFound.egn === person.egn || personIn.enc === person.enc) && typePerson === person.TYPE_OBJECT * 1) {
                    //set image
                    if (person.photo !== undefined && person.photo !== "") {
                        $('#modalConfirmPerson img.img-thumbnail').attr('src', 'data:image/png;base64,' + person.photo.photo);
                    } else {
                        $('#modalConfirmPerson img.img-thumbnail').attr('src', "../assets/img/no_image.jpg")
                    }
                    //set names
                    $('#modalConfirmPerson #fgnNameLatin').val(person.imena);

                    $('#modalConfirmPerson #fgnNameCirilic').val(person.imek);
                    //set EGN and other important id
                    $('#modalConfirmPerson #personIdegn').val(person.egn);
                    $('#modalConfirmPerson #personIdenc').val(person.enc);
                    $('#modalConfirmPerson #personIdegn').attr('sid', person.sid_o);
                    $('#modalConfirmPerson #personIdegn').attr('pnr', person.pnr_o);
                    $('#modalConfirmPerson #personIdegn').attr('typep', person.TYPE_OBJECT);
                    //set Pol
                    let polPerson = person.pol;
                    $('#modalConfirmPerson #personSex').attr('cod_z', polPerson);
                    $('#modalConfirmPerson #personSex').val(polPerson);
                    //setDateOfBirth
                    $('#modalConfirmPerson #dateBirthDay').val(person.datRaj);
                    //setAge
                    $('#modalConfirmPerson #personAge').val(getAgeFromBirthDay(person.datRaj));
                    //setNationality
                    $('#modalConfirmPerson #personNationality').val(person.graj);
                    $('#modalConfirmPerson #personNationality').attr('cod_z', person.graj).attr('type_person', person.TYPE_OBJECT);
                    //vid dokument
                    $('#modalConfirmPerson #typeDocFgn').val(person.vidDok);
                    // nomer na dokument
                    $('#modalConfirmPerson #numDocFgn').val(person.nacPasp);
                    //data na izdavane na dokument
                    $('#modalConfirmPerson #issueDateDocFgn').val(person.datIzd);
                    //srok na validnost
                    $('#modalConfirmPerson #exDateDocFgn').val(person.datVal);
                }
            }

            loadAddresses(person);
            isPersonFound = true;
            $('#modalConfirmPerson').modal('show');

        }
    });

    if (!isPersonFound) {
        createModal("error", "Лицето не е намерено!", false, false);
    }

}

//clear searchPersonForm
function clearSearchPerson() {

    $('#typeIdentity').show();
    let $form_selected = $('#searchPersonForm');
    $form_selected.find('#searchPerson').show();
    $form_selected.find('#addPersonWihoutID').hide();
    $form_selected.find('.form-check :checked').prop('checked', false);
    $('#bgNationality').prop('checked', true).trigger('change');
    $form_selected.find('#egn_ench').val('');
    $('#modalConfirmPerson').find('[id]').each(function (idx) {
        $(this).val('');
        $(this).removeAttr('cod_z');
    });
    $('#modalConfirmPerson').find('img').attr('src', '');
    $('#modalConfirmPerson #personIdegn').removeAttr('sid');
    $('#modalConfirmPerson #personIdegn').removeAttr('pnr');
    $('#modalConfirmPerson #personIdegn').removeAttr('typep');



}


// const processingPersonDecode = async (person) => {
//     //base data
//     return new Promise((resolve, reject) => {
//         // if (person.photo === undefined || person.photo === "") {
//         //     person.photo = {}
//         //     person.photo.photo = "";
//         // }
//         if (person.TYPE_OBJECT * 1 === 1) { //bg
//             person["fullName"] = person.ime + ' ' + person.prezime + ' ' + person.familno;
//             person.pol_txt = findTextByCodFromStorage(JSON.parse(localStorage.getItem('pol')).hiera, getPolFromEgn(person.egn));
//             person["graj"] = 6067;
//             person["graj_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, 6067);
//         } else { //chujdenec
//             person["fullName"] = person.imek;
//             person.pol_txt = findTextByCodFromStorage(JSON.parse(localStorage.getItem('pol')).hiera, person.pol * 1);
//             person["graj_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, person.graj);
//             person["nacBel_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, person.nacBel);
//             person["vidDok_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('vid_lichen_dok')).hiera, person.vidDok);
//         }
//         if (person.hasOwnProperty('fdv')) {
//             let fdv = person.fdv;
//             //decode fdv if needed
//             // fdv.rol_o -- rolq na liceto
//             if (fdv.hasOwnProperty('fdvOpList')) {
//                 let fdvOpList = fdv.fdvOpList;
//                 if (!Array.isArray(fdvOpList)) {
//                     fdvOpList = [fdvOpList];
//                 }
//                 $.each(fdvOpList, async function () {
//                     let fdvOpObject = this;
//                     //decode fdvOpObject if needed
//                     fdvOpObject["dtip_txt"] = '_DEKODIRAN DTIP_LICE_MOMENT';
//                     fdvOpObject["stoinost_txt"] = '_DEKODIRANA STOINOST_LICE_MOMENT';
//                 });
//             }

//         }
//         //slovesno
//         if (person.hasOwnProperty('personSlovesnoList')) {
//             let personSlovesnoList = person.personSlovesnoList;
//             if (!Array.isArray(personSlovesnoList)) {
//                 personSlovesnoList = [personSlovesnoList];
//             }
//             $.each(personSlovesnoList, async function () {
//                 let personSlovesnoObject = this;
//                 //decode personSlovesnoObject if needed
//                 if (!personSlovesnoObject.hasOwnProperty('dtip_txt')) {
//                     personSlovesnoObject["dtip_txt"] = '_DEKODIRAN DTIP_SLOVESNO';
//                 }
//                 personSlovesnoObject["stoinost_txt"] = '_DEKODIRANA STOINOST_SLOVESNO';
//             });

//         }
//         //adresi
//         let promises = [];
//         if (person.hasOwnProperty('addresses')) {
//             let addresses = person.addresses;
//             if (!Array.isArray(addresses)) {
//                 addresses = [addresses];
//             }
//             let addressesArray = [];

//             $.each(addresses, async function () {
//                 promises.push(await setAdrData(this).then(data => addressesArray.push(data)));
//             });
//             Promise.all(promises).then(() => {
//                 delete person.addresses;
//                 person['addresses'] = addressesArray;
//             });


//         }

//         Promise.all(promises).then(() => {
//             resolve(personChanged.addChangedPerson(person));
//         });
//     });
// };

//function to add person in new array when change something in it
const personChanged = {
    addChangedPerson: function (personData) {
        let personsArr;
        if (sessionStorage.getItem("persons_db_changed") === null) {
            personsArr = [];
            personsArr.push(personData);
            sessionStorage.setItem("persons_db_changed", JSON.stringify(personsArr));
        } else {
            personsArr = JSON.parse(sessionStorage.getItem("persons_db_changed"));
            if (!this.isExist(personData.sid_o)) {
                personsArr.push(personData);
                sessionStorage.removeItem('persons_db_changed');
                sessionStorage.setItem("persons_db_changed", JSON.stringify(personsArr));
            }
        }
        return personsArr;
    },
    isExist: function (personId) {
        let isPersonIn = false;
        let personsArr = JSON.parse(sessionStorage.getItem("persons_db_changed"));
        $.each(personsArr, function (num, personObj) {
            if (personObj.sid_o * 1 === personId * 1) {
                isPersonIn = true;
                return false;
            }
        });
        return isPersonIn;
    },
    removeChanged: function (personId) {
        if (this.isExist(personId)) {
            let personsArr = JSON.parse(sessionStorage.getItem("persons_db_changed"));

            let findedIndex;
            $.each(personsArr, function (num, personObj) {
                if (personObj.sid_o * 1 === personId * 1) {
                    findedIndex = num;
                    return false;
                }
            });
            if (findedIndex !== undefined) {
                personsArr.splice(findedIndex, 1);
                sessionStorage.removeItem('persons_db_changed');
                sessionStorage.setItem("persons_db_changed", JSON.stringify(personsArr));
            }
        }
    },

    getChanged: function (personId) {
        let findedPerson;
        if (this.isExist(personId)) {
            let personsArr = JSON.parse(sessionStorage.getItem("persons_db_changed"));
            $.each(personsArr, function (num, personObj) {
                if (personObj.sid_o * 1 === personId * 1) {
                    findedPerson = personObj;
                    return false;
                }
            });
        }
        return findedPerson;
    },
    //Jivko 27.03.2024
    compareDB_changed_person: function (personId) {
        let personsArr, personsArrChanged;
        let personFound, personChangedFound;
        if (sessionStorage.getItem("persons_db") === null || sessionStorage.getItem("persons_db_changed") === null) {
            console.log('Nothing for compare!')
        } else {
            personsArr = JSON.parse(sessionStorage.getItem("persons_db"));
            personsArrChanged = JSON.parse(sessionStorage.getItem("persons_db_changed"));
            $.each(personsArr, function () {
                if (this.sid_o * 1 === personId * 1) {
                    personFound = this;
                    return false;
                }
            });
            $.each(personsArrChanged, function () {
                if (this.sid_o * 1 === personId * 1) {
                    personChangedFound = this;
                    return false;
                }
            });
            if (personFound !== undefined && personChangedFound !== undefined) {
                //check for diff
                console.log(compare(personFound, personChangedFound));
            } else {
                console.log('Nothing for compare!')
            }
        }

    }
}

//test function
function compare(original, copy){
    for(let [k,v] of Object.entries(original)){
        if(typeof v === "object" && v !== null){
            if(!copy.hasOwnProperty(k)){
                copy[k] = v;
            } else {
                compare(v, copy?.[k]);
            }
        } else {
            if(Object.is(v, copy?.[k])){
                delete copy?.[k]
            }
        }
    }
    return JSON.stringify(copy);
}

//function for add person (new or existing) in sessionStorage for next processing
const personStorage = {
    addPerson: function (personData) {
        let personsArr;
        if (sessionStorage.getItem("persons_db") === null) {
            personsArr = [];
            personsArr.push(personData);
            sessionStorage.setItem("persons_db", JSON.stringify(personsArr));
        } else {
            personsArr = JSON.parse(sessionStorage.getItem("persons_db"));
            if (!this.isExist(personData.sid_o)) {
                personsArr.push(personData);
                sessionStorage.removeItem('persons_db');
                sessionStorage.setItem("persons_db", JSON.stringify(personsArr));
            }
        }
        return personsArr;
    },
    isExist: function (personId) {
        let isPersonIn = false;
        let personsArr = JSON.parse(sessionStorage.getItem("persons_db"));
        $.each(personsArr, function (num, personObj) {
            if (personObj.sid_o * 1 === personId * 1) {
                isPersonIn = true;
                return false;
            }
        });
        return isPersonIn;
    },
    removePerson: function (personId) {
        if (this.isExist(personId)) {
            let personsArr = JSON.parse(sessionStorage.getItem("persons_db"));

            let findedIndex;
            $.each(personsArr, function (num, personObj) {
                if (personObj.sid_o * 1 === personId * 1) {
                    findedIndex = num;
                    return false;
                }
            });
            if (findedIndex !== undefined) {
                personsArr.splice(findedIndex, 1);
                sessionStorage.removeItem('persons_db');
                sessionStorage.setItem("persons_db", JSON.stringify(personsArr));
            }
        }
        //premaha elementa i ot promenenite hora
        personChanged.removeChanged(personId);
    },
    getPerson: function (personId) {
        let findedPerson;
        if (this.isExist(personId)) {
            let personsArr = JSON.parse(sessionStorage.getItem("persons_db"));
            $.each(personsArr, function (num, personObj) {
                if (personObj.sid_o * 1 === personId * 1) {
                    findedPerson = personObj;
                    return false;
                }
            });
        }
        return findedPerson;
    }
}

//return pol type from egn
function getPolFromEgn(egn) {
    let pol = "";
    if (egn.length === 10) {
        if (parseInt(egn.slice(8, 9)) % 2 === 0) {
            pol += 0
        }
        else {
            pol += 1
        }
    }
    return pol;
}

//return Age from egn in this moment
function getAgeFromEgn(egn) {

    let d_now = new Date();
    let year = egn.slice(0, 2) - 0;
    let month = egn.slice(2, 4) - 0;
    let day = egn.slice(4, 6) - 0;
    let age = 0;
    if (month > 40) {
        year += 2000;
        month = month - 40;
    } else {
        year += 1900;
    }
    age = d_now.getFullYear() - year;
    if (d_now.getMonth() + 1 < month) {
        age -= 1;
    } else {
        if (d_now.getMonth() + 1 === month) {
            if (d_now.getDate() < day) {
                age -= 1
            }
        }
    }
    return age;
}

//return age by date of birthday
function getAgeFromBirthDay(birthday) {
    let d_now = new Date();
    var year = '';
    var month = '';
    var day = '';
    day = birthday.substring(0, 2) - 0;
    month = birthday.substring(3, 5) - 0;
    year = birthday.substring(6, 10) - 0;
    let age = 0;
    age = d_now.getFullYear() - year;
    if (d_now.getMonth() + 1 < month) {
        age -= 1;
    } else {
        if (d_now.getMonth() + 1 === month) {
            if (d_now.getDate() < day) {
                age -= 1
            }
        }
    }
    return age;
}
//return birthday from egn
function getBirthDayFromEgn(egn) {
    var year = '';
    var month = '';
    if (egn === undefined || egn === "") {
        return '-1';
    } else {
        if (egn.substring(2, 3) === '4' | egn.substring(2, 3) === '5') {
            year = '20' + egn.substring(0, 2);
            month = egn.substring(2, 4) - 40;
            if (month < 10) {
                month = '0' + month;
            }
        } else {
            year = '19' + egn.substring(0, 2);
            month = egn.substring(2, 4);
        }
        var date = egn.substring(4, 6);
        return date + '.' + month + '.' + year;
    }
}

//calculate age during the event
function getAgeDuringEvent(dateEvent, dateBirdth){
    if(dateEvent !== undefined && $.trim(dateEvent) !== ''
        && dateBirdth !== undefined && $.trim(dateBirdth) !== ''){
    let evFullYear, birthFullYear;
    let evMonth, birthMont;
    let evDay, birthDay;

    }
}


//moved by HDonev 26.03.2024
function loadPersonData() {

    // var inputPersonID = $('#egn_ench').val();
    // var regex = /^\d{10}$/;
    // if (regex.test(inputPersonID)) {
    //     if (!validationEGN(inputPersonID) && !validationENCH(inputPersonID)) {
    //         createModal('error', 'Невалидно ЕГН/ЕНЧ.', false, false);
    //         return;
    //     }
    // } else {
    //     createModal('error', 'Дължината на ЕГН/ЕНЧ не отговаря', false, false);
    //     return;
    // }

    $.each($('#modalConfirmPerson').find('.readable'), function () {
        $(this).removeClass('readable');
        $(this).prop('readonly', true);
    });
    $.each($('#modalConfirmPerson').find('.enableble'), function () {
        $(this).removeClass('enableble');
        $(this).prop('disabled', true);
    });

    $('#modalConfirmPerson').find('h5:first').text('Потвърди лицето');
    // .on('click', function(){
    //     personStorage.removePerson($('#modalConfirmPerson #personIdegn').attr('sid'));
    // })

    // $('#dateBirthDay').parent().off('dp.change');
    //check for valid searching parameters
    let processingPersonByParameters = checkForSearchingParameters();
    if (processingPersonByParameters !== undefined && processingPersonByParameters.length === 3) { // lice s identifikator
        let typePerson = processingPersonByParameters[0] * 1;
        let typeIdentifier = processingPersonByParameters[1] * 1;
        let identifier = processingPersonByParameters[2];
        let isPersonSearched = false;
        // need to check for person in localStorage before send ajax request!
        // if(sessionStorage.getItem('persons_db') !== null){
        //     personStorage.isExist()
        // }
        //url for searching person
        let urlSearchPerson = URL_TO_USE + '/get-person-by-identifier?identifier=' + identifier + '&typeIdentifier=' + typeIdentifier + '&typePerson=' + typePerson;
        // let urlSearchPerson = 'http://10.252.14.24:9090/domestic-violence/get-person-by-identifier?identifier=' + ident + '&typeIdentifier=' + typeIdentifier + '&typePerson=' + typePerson;
        $.ajax({
            url: urlSearchPerson, //uncomment for test BDS
            // url: "../assets/server_json/server_lice_incomming.json", //uncomment for load person data from json
            dataType: 'json',
            success: function (data) {

                //     processingPersonDecode(data).then((res) => {
                //         console.log(res)
                //         // setBasePersonData(typePerson, res);
                // });
                if (data !== undefined) {
                    let showConfurm = true;
                    setBasePersonData(typePerson, data, showConfurm);
                } else {
                    createModal("error", "Лицето, което търсите не е намерено!", false, false);
                }
            }
        })
    } else if (processingPersonByParameters !== undefined && processingPersonByParameters[0] * 1 === -1) { //lice bez identifikator
        $('#modalConfirmPerson').find('.person-bg').hide();
        $('#modalConfirmPerson').find('.person-cuz').hide();
        $('#modalConfirmPerson').find('.person-noid').show();
        $('#imagePersonId').attr('src', "../assets/img/no_image.jpg");
        var myModal = new bootstrap.Modal(document.getElementById('modalConfirmPerson'));
        myModal.show();
        $('#modalConfirmPerson').find('h5:first').text('Въвеждане на чужденец без идентификатор');
        $.each($('#modalConfirmPerson').find('[readonly]'), function () {
            if ($(this).attr('id') !== 'personAge') {
                if ($(this).is(':visible')) {
                    $(this).addClass('readable');
                    $(this).removeAttr('readonly');
                }
            }
        });
        $.each($('#modalConfirmPerson').find('[disabled]'), function () {
            if ($(this).is(':visible')) {
                $(this).addClass('enableble');
                $(this).removeAttr('disabled');
            }
        });

    }
}
//moved by HDonev 26.03.2024
function checkForSearchingParameters() {
    let identifier = $('#egn_ench').val();
    let typePerson, typeIdentifier;
    $.each($('#searchPersonForm').find('.form-check :checked'), function (idx, item) {
        switch ($(item).attr('name')) {
            case "groupSearchByNationality":
                if ($(item).attr('id') === "bgNationality") {
                    typePerson = "1";
                }
                if ($(item).attr('id') === "fgNationality") {
                    typePerson = "2";

                }
                if ($(item).attr('id') === "fgWithoutID") {
                    typePerson = "-1";
                };

                break;
            case "groupSearchById":
                if ($(item).attr('id') === "bgID") {

                    typeIdentifier = "1";
                }
                if ($(item).attr('id') === "fgID") {
                    typeIdentifier = "0";
                }
                break;
            default:
                createModal("error", "Грешни идентификатори за търсене!", false, false);
                break;
        }
    });
    let processingPersonByParameters = [];
    if (typePerson === '-1') { // withotid
        createModal("error", "Моля попълни формата внимателно!", false, false);
        // $('#fgnNameLatin').focusout(function(){
        //     $('#fgnNameCirilic').removeAttr('readable').attr('readonly','');
        //     $('#personSex').removeAttr('enableble').attr('disabled','');
        //     $('#typeDocFgn').removeAttr('enableble').attr('disabled','');
        //     $('#numDocFgn').removeAttr('readable').attr('readonly','');
        //     $('#issueDateDocFgn').removeAttr('readable').attr('readonly','');
        //     $('#exDateDocFgn').removeAttr('readable').attr('readonly','');
        //     console.log('check for lice!!!!!');
        //     if($('#fgnNameLatin').val().length > 6 && $('#personNationality option:selected').attr('cod_z') !== undefined && $('#dateBirthDay').val() !== ''){
        //         let channgedDate = $('#dateBirthDay').val();

        //         let urlSearchFgWithoutID = URL_TO_USE + '/request-foreigner?name='+$('#fgnNameLatin').val()+'&birthDate='+channgedDate+'&nationality='+$('#personNationality option:selected').attr('cod_z') *1;

        //         $.ajax({
        //             url: urlSearchFgWithoutID, //uncomment for test 
        //             // url: "../assets/server_json/server_signal_incomming.json", //uncomment for load event data from json
        //             dataType: 'json',
        //             success: function (data) {
        //                console.log(data)
        //                if (!Array.isArray(data)) {
        //                 data = [data];
        //                }
        //                $.each(data, function(){
        //                 console.log(this.person)
        //                })

        //             },
        //             error: function (err) {
        //                 // window.app_spinner.hide();
        //                 console.log(err);
        //             }
        //         });
        //     } else {
        //         return;
        //     }
        // })

        if (checkForAddedPersons(typePerson, typeIdentifier, identifier)) {
            createModal("error", "Лицето вече е добавено към събитието!", false, false);
            return;
        }

        processingPersonByParameters.push(typePerson);
        return processingPersonByParameters;
    } else {
        if ($('#searchPersonForm').find('.form-check :checked').length < 2 || identifier === '') {
            createModal("error", "Непълни данни за търсене на лице!", false, false);
            return;
        }

        //check for added Persens in table
        if (checkForAddedPersons(typePerson, typeIdentifier, identifier)) {
            createModal("error", "Лицето вече е добавено към събитието!", false, false);
            return;

        }
        processingPersonByParameters.push(typePerson, typeIdentifier, identifier);
        return processingPersonByParameters;
    }

}
//moved by HDonev 26.03.2024
//check is person added in table
function checkForAddedPersons(typePerson, typeIdentifier, identifier) {
    //neew to implement by EGN/ENCH in table
    let personIsAdded = false;
    if ($('#dataPerson-table-body > tr > td:nth-child(3)').length > 0) {
        $('#dataPerson-table-body > tr ').each(function () {
            if ($(this).attr('typep') * 1 === typePerson * 1 && typePerson * 1 === 1 && typeIdentifier * 1 === 1) { //bg s egn
                if ($(this).children('td:nth-child(3)').attr('egn') + '' === identifier + '') {
                    personIsAdded = true;
                    return;
                }
            }
            if ($(this).attr('typep') * 1 === typePerson * 1 && typePerson * 1 === 2) { //cuz
                if (typeIdentifier * 1 === 1) { //s egn
                    if ($(this).children('td:nth-child(3)').attr('egn') + '' === identifier + '') {
                        personIsAdded = true;
                        return;
                    }
                } else if (typeIdentifier * 1 === 0) {//s enc
                    if ($(this).children('td:nth-child(3)').attr('enc') + '' === identifier + '') {
                        personIsAdded = true;
                        return;
                    }
                }
            }
        })
    } else {
        $('#dataPerson-table-body > tr ').each(function () {
            //imena
            let imena_check = $(this).children('td:nth-child(2)').children('span').remove().html();
            imena_check = imena_check.split('<br>');
            console.log('TUK TRQBVA DA E PROVERKATA ZA LICA. TARSI PO TOZI STRING! v violence_alert.js') // remove this row!!!!!!
            console.log(imena_check);
        })
    }
    return personIsAdded;
}