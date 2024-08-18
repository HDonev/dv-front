function collectPersonData(){
    //get classes
    //let foundedPersonFields = $('[class*=person-base').not('.person-stat');
    let personObject = {
        "TYPE_OBJECT": $('#personNationality').attr('type_person'),
        "sid_o": $('#personId').attr('sid'),
        "pnr_o": $('#personId').attr('pnr'),
        "pol": $('#personSex').attr('cod_z'),
        "dat_vav": "HOW TO SET",
        "mrk_akt": "HOW TO SET",
        "operation": "HOW TO SET",
        "ime": $('#personIme').val(),
        "prezime": $('#personPrezIme').val(),
        "familno": $('#personFamilno').val(),
        "egn": $('#personId').val()
    };
    
    let fdvPerson = {
        "sid_f": null,
        "pnr_f": null,
        "fact": "HOW TO SET",
        "cod_t": personObject.TYPE_OBJECT,
        "sid_o": personObject.sid_o,
        "pnr_o": personObject.pnr_o,
        "rol_o": "HOW TO SET",
        "mrk_akt": "Y",
        "podsist": 34000,
        "dat": "2023-11-20",
        "cas": "14:16:00"
      };

      let address =  {
        
        "eknm": 6813,
        "kod_ul": 172453,
        "nomer": "324",
        "mrk_akt": "Y",
        "dat_vav": "2023-11-07",
        "operation": 0
      }

      let fdvAddress = {
        "sid_f": 3,
        "pnr_f": 2,
        "fact": 6248,
        "cod_t": 17,
        "sid_o": 330103,
        "pnr_o": 1,
      "rol_o": 18726,
      "mrk_akt": "Y",
      "podsist": 34000,
      "dat": "2023-11-20",
      "cas": "14:16:00"
    };

    let fadDopAddress = {
        "sid_f": 3,
        "pnr_f": 2,
        "pod_adr": 225,
        "vid_adr": 18726,
        "etaj": "7",
        "apart": "27",
        "mrk_akt": "Y",
        "opisanie": "",
        "operation": 0
      }

    address['fdv']=fdvAddress;
    address['fadDop'] = fadDopAddress;

    let addressesList = [];
    addressesList.push(address);
    personObject['fdv'] = fdvPerson;
    personObject['addresses'] = addressesList;
    console.log(personObject);
    
}

function savePersonInfo(){
    //get person classes

    //check if field is hidden
    if($(this).is(':visible')){
    //get data by differrnt id
    
    }
}

function saveEventInfo(){

}