

const populateSelect = {
    'loadDefault': function (targetId) {
        let $select = $('#' + targetId);
        let hieraName = $($select).attr('use-hiera');
        let addEmptyVal = '<option value="" disabled selected>Избери</option>';
        
        var arrayOptions=[];
        
        $($select).append(addEmptyVal);
        
        if (hieraName !== undefined || hieraName !== '') {
            if (localStorage.getItem(hieraName) !== null) {
                let jsonData = JSON.parse(localStorage.getItem(hieraName)).hiera.row;
                $.each(jsonData, function (i, option) {
                    arrayOptions.push(`<option value="${option.cod_z}" cod_z=${option.cod_z}>${option.ime_z}</option>`)
                });
            } else {
                console.log('Id: ' + targetId + ' is not found!');
            }
        } else {
            console.log('Hiera for id: ' + targetId + ' is not defined!');
        }

        $($select).append(arrayOptions);
        
    },
    'setData': function (targetId, data) {
        let $select = $('#' + targetId);
        let hieraName = $($select).attr('use-hiera');
        if (hieraName !== undefined && hieraName !== '') {
            this.loadDefault(targetId)
        }
        let addEmptyVal = '<option value="0" disabled selected>Избери</option>';
        $($select).append(addEmptyVal);
        if (data !== undefined) {
            let jsonData = data;
            $.each(jsonData, function (i, option) {
                let optionItem = `<option value="${option.cod_z} cod_z=${option.cod_z}">${option.ime_z}</option>`;
                $($select).append(optionItem);
            });
        } else {
            console.log('Hiera for id: ' + targetId + ' is not found!');
        }
    }
}
    //pol
    populateSelect.loadDefault('personSex');
    
    //person nationality - grajdanstvo
    populateSelect.loadDefault('personNationality');

    // //relations 
    //  populateSelect.loadDefault('relationToPerp');
    //  populateSelect.loadDefault('relationToVictChild');

     //way to recieving the signal
     populateSelect.loadDefault('eventFrom');

     //moment condition of person
     populateSelect.loadDefault('momentSast');

     //iconomic activity person
     populateSelect.loadDefault('iconomActivity');

     //degree of education of person
     populateSelect.loadDefault('degreeEduPerson');
 
     
    //type documents
     populateSelect.loadDefault('docType');
     

    //risk assesment
     populateSelect.loadDefault('riskAssessment');


     //type person document
     populateSelect.loadDefault('typeDocFgn');

    //event place
     populateSelect.loadDefault('eventPlace');

       //result of KOS service
     populateSelect.loadDefault('kosService');



     
