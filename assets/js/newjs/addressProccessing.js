const addressDecodeProccessing  = function(address){

} 


//add addresses in modalConfimPerson
async function loadAddresses(data) {
if (data.addresses !== undefined){
    if (!Array.isArray(data.addresses)) {
        data.addresses = [data.addresses];
       }
    let json_eknmData = JSON.parse(localStorage.getItem('eknm'));
    let first_id;
    for (var address of data.addresses) {

        let second_id_pref;
        //get type addres
        if (address.fdv.rol_o == 5030) { //postoqnen
            first_id = '#modalConfirmPerson ';
            second_id_pref = '#personPerm';
        } else if (address.fdv.rol_o == 18726) { //nastoqsht
            first_id = '#modalConfirmPerson ';
            second_id_pref = '#personPresent';
        }
        // else if (address.fdv.rol_o == 18725) { //adres za prizovavane
        //     // addressProccessing(address).then(data => {
        //     //     setAddressEknmUlica("personCurrEknm", data.eknm, data.kod_ul);
        //     //     $('#personCurrNom').val(data.nomer);
        //     //     $('#personCurrVhod').val(data.vhod);
        //     //     if (data.hasOwnProperty('fadDop')) {
        //     //         $('#personCurrEtaj').val(data.fadDop.etaj);
        //     //         $('#personCurrApart').val(data.fadDop.apart);
        //     //     }
        //     // });
        // }
        else {
            second_id_pref = undefined;
            console.log('Ненамерен тип на адреса!');
        }

        if (second_id_pref !== undefined) {
            $(first_id + second_id_pref + 'Eknm').val(findTextByCodFromStorage(json_eknmData.hiera, address.eknm)).attr('cod_z', address.eknm);
            if (address.kod_ul !== undefined) {
                $(first_id + second_id_pref + 'Ulica').val(findTextByCodFromStorage(await ulDecodeCod(address.kod_ul), address.kod_ul)).attr('cod_z', address.kod_ul);
            } else {
                $(first_id + second_id_pref + 'Ulica').val('').attr('cod_z', '');
            }
            $(first_id + second_id_pref + 'Nom').val(address.nomer !== undefined ? address.nomer : '');
            $(first_id + second_id_pref + 'Vhod').val(address.vhod !== undefined ? address.vhod : '');
            $(first_id + second_id_pref + 'Etaj').val(address.fadDop !== undefined ? address.fadDop.etaj : '');
            $(first_id + second_id_pref + 'Apart').val(address.fadDop !== undefined ? address.fadDop.apart : '');
              await setAddressesTxt();
        }


        //after decoded data!!!
        // if (second_id_pref !== undefined) {
        //     $(first_id + second_id_pref + 'Eknm').val(address.eknm_txt).attr('cod_z', address.eknm);
        //     $(first_id + second_id_pref + 'Ulica').val(address.kod_ul_txt).attr('cod_z', address.kod_ul);
        //     $(first_id + second_id_pref + 'Nom').val(address.nomer);
        //     $(first_id + second_id_pref + 'Vhod').val(address.vhod);
        //     $(first_id + second_id_pref + 'Etaj').val(address.fadDop !== undefined ? address.fadDop.etaj : '');
        //     $(first_id + second_id_pref + 'Apart').val(address.fadDop !== undefined ? address.fadDop.apart : '');
        //     setAddressesTxt();

        // }
    }
}
}

//add all text for address from hidden input tags
 async function setAddressesTxt() {
    if ($('#personPermEknm').val().length !== 0) {
        let adrTxt = [];
        adrTxt.push($('#personPermEknm').val());
        adrTxt.push($('#personPermUlica').val().length !== 0 ? $('#personPermUlica').val() : '');
        adrTxt.push($('#personPermNom').val().length !== 0 ? 'БЛ./№ ' + $('#personPermNom').val() : '');
        adrTxt.push($('#personPermVhod').val().length !== 0 ? 'ВХ. ' + $('#personPermVhod').val() : '');
        adrTxt.push($('#personPermEtaj').val().length !== 0 ? 'ЕТ. ' + $('#personPermEtaj').val() : '');
        adrTxt.push($('#personPermApart').val().length !== 0 ? 'АП. ' + $('#personPermApart').val() : '');
        let adrFullTxt = adrTxt.filter(function (v) { return v != '' })
        $('#personPermAddress').val(
            adrFullTxt.join(', ')
        );
    }
    if ($('#personPresentEknm').val().length !== 0) {
        let adrTxt = [];
        adrTxt.push($('#personPresentEknm').val());
        adrTxt.push($('#personPresentUlica').val().length !== 0 ? $('#personPresentUlica').val() : '');
        adrTxt.push($('#personPresentNom').val().length !== 0 ? 'БЛ./№ ' + $('#personPresentNom').val() : '');
        adrTxt.push($('#personPresentVhod').val().length !== 0 ? 'ВХ. ' + $('#personPresentVhod').val() : '');
        adrTxt.push($('#personPresentEtaj').val().length !== 0 ? 'ЕТ. ' + $('#personPresentEtaj').val() : '');
        adrTxt.push($('#personPresentApart').val().length !== 0 ? 'АП. ' + $('#personPresentApart').val() : '');
        let adrFullTxt = adrTxt.filter(function (v) { return v != '' })
        $('#personPresentAddress').val(
            adrFullTxt.join(', ')
        );
    }
}


function setEventAddress(address){

    setAddressEknmUlica('eventAddress',address.eknm, address.kod_ul);
    
}

function setPersonCurrAddress(address){

    setAddressEknmUlica('personCurrEknm',address.eknm, address.kod_ul);
    
}

// let typeAddress = "";
let addressTmp = {
    "sid_o": 0,
    "pnr_o": 0,
    "eknm": 0,
    "kod_ul": 0,
    "nomer": "",
    "vhod": "",
    "mrk_akt": "",
    "dat_vav": "",
    "operation": 0
};
let fadDopTmp = {
    "sid_f": 0,
    "pnr_f": 0,
    "pod_adr": 0,
    "vid_adr": 0,
    "etaj": "",
    "apart": "",
    "mrk_akt": "",
    "opisanie": "",
    "operation": 0
};


// async function  addressProccessing(address) {
//     //check operation
//     //if 0 - select
//     //if 1 - insert
//     //if 2 - update
//     //if 3 - delete



//     const data = await setAdrData(address);
//     return data;
// }


// //vrazkiProccessing : vrazkiProccessing,

//function for decode and set data comming from server
async function setAdrData(address) {
    let addressTmpProccessing = { ...addressTmp };
    
    let addressReady;
    let addrKey = Object.keys(address);
    for (var key in addrKey) {
        if (addressTmpProccessing.hasOwnProperty(addrKey[key])) {
            addressTmpProccessing[addrKey[key]] = address[addrKey[key]];
            switch (addrKey[key]) {
                case 'eknm':
                    addressTmpProccessing['eknm_txt'] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('eknm')).hiera, address[addrKey[key]]);
                    break;
                case 'kod_ul':
                    await ulDecodeCod(address[addrKey[key]]).then(data => {
                        if(data !== undefined){
                        addressTmpProccessing['kod_ul_txt'] = data.row.ime_z;
                        } else {
                            addressTmpProccessing['kod_ul_txt'] = '';
                        }

                    }).catch((err)=>{
                        addressTmpProccessing['kod_ul_txt'] = '';
                    });
                    break;
                default:
                    break;
            }
        }
    }
    addressReady = addressTmpProccessing;
    let fadDopReady = await fadDopProccessing(address);
    let fdvRead = fdvProccessing(address.fdv);
    console.log(addressReady);
    return addressComplete(addressReady, fadDopReady, fdvRead);
};
// //function to get data from page and add to Object for save
// // getData: function () {

// // },
// // //function for change some field in address object
// // changeData: function () {

// // },
// // //function for decoding data
// // decodeData: function () {

// // },
//function to check, change or delete dopalnitelni danni kam adresa
async function fadDopProccessing(address) {
    let fatDopTmpProccessing = { ...fadDopTmp };
    if (address.hasOwnProperty('fadDop')) {
        let addressDop = address.fadDop
        let dopAddrKey = Object.keys(addressDop);
        for (var key in dopAddrKey) {
            if (fatDopTmpProccessing.hasOwnProperty(dopAddrKey[key])) {
                fatDopTmpProccessing[dopAddrKey[key]] = addressDop[dopAddrKey[key]];
                switch (dopAddrKey[key]) {
                    case 'pod_adr':
                        fatDopTmpProccessing['pod_adr_txt'] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('podelenia')).hiera, addressDop[dopAddrKey[key]]);
                        break;
                    case 'vid_adr':
                        await decodeByOsiTablAndVal('vid_adr', addressDop[dopAddrKey[key]]).then(data => {
                            fatDopTmpProccessing['vid_adr_txt'] = data;
                        });
                        break;

                    default:
                        break;
                }
            }
        }
    } else {
        fatDopTmpProccessing = null;
    }
    return fatDopTmpProccessing;
};
// //function for create, change, delete vrazka na adresa
// // fdvProccessing: function () {

// // },
// // //function for search addresses;
// // searAddresses: function () {

// // },
function addressComplete(adr, adrDop, fdv) {
    if (adrDop !== null) {
        adr['fadDop'] = adrDop;
    } 
    if (fdv !== null){
        adr['fdv'] = fdv;
    }
    return adr;
}




 let fdvTmp =  {
        "sid_f": 0,
        "pnr_f": 0,
        //za adres - cod_t = 17
        //14 - adresna registraciq
        //6248 - mestojiveene
        //22 - postoqnen adres
        //8248 - adres na mestoizwarshvane
        "fact": 0,
        "cod_t": 0,
        "sid_o": 0,
        "pnr_o": 0,
        "rol_o": 0,
        "mrk_akt": "",
        "podsist": 0,
        "dat": "",
        "cas": ""
    };

// let fdvOpTmp = {
//         "sid_f": 0,
//         "pnr_f": 0,
//         "pnr_d": 0,
//         "cod_t": 0,
//         "dtip": 0,
//         "stoinost": 0,
//         "opisanie": "",
//         "mrk_akt": "",
//         "dat_vav": "",
//         "operation": 0
//     }


    function fdvProccessing(fdvData){
        let fdvReady;
        if (fdvData.cod_t === 17){
            fdvReady = setVrData(fdvData)
        } else{
            fdvReady = null;
        }
        return fdvReady;
    }

    function setVrData(fdv){
        let fdvTmpProccess = {... fdvTmp};

        let fdvKey = Object.keys(fdv);
        for (var key in fdvKey) {
            if (fdvTmpProccess.hasOwnProperty(fdvKey[key])) {
                fdvTmpProccess[fdvKey[key]] = fdv[fdvKey[key]];
            }
        }
        return fdvTmpProccess;
    }

//     function fdvOpProccessing(fdvOp){

//     }


