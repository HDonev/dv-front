// store needed hieras in localstorage
var times_from_grid = {};
var times_from_storage;
//hiera url: http://osit-lb1:9001/osi/rest/hiera/<table>/<cod_i>/<cod_z1>?format=json&t=simple
//TESTURL //https://appps.mvr.bg/osi/rest/hiera/durjavi/0/7412?format=json

//var with hieras parameters
let hieras_for_load = {
    "pol": {
        "source": "file",
        "table": "unknown",
        "cod_z1": 0,
        "cod_i": 0
        //        if cod_i === 0 without valgg 
    },
    "person_role": {
        "source": "file",
        "table": "unknown",
        "cod_z1": 0,
        "cod_i": 0
        //        if cod_i === 0 without valgg 
    },
    // "nastaniavane": {
    //     "source": "url",
    //     "table": "dps",
    //     "cod_z1": 19396,
    //     "cod_i": 19396
    // },
    // "otnoshenie_kam_izvarshitel": {
    //     "source": "url",
    //     "table": "otnoshenie",
    //     "cod_z1": 18732,
    //     "cod_i": 18732
    // },
    // "communication_point": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
        
    // },
    // "podelenia_12420_12420": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
    // },
    // "merki_zzdn_16470_16470": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
    // },
    // "new_from_29112023/haracter_7155_7155_naklonnosti": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
    // },
    // "new_from_29112023/haracter_7155_7155_zavisimosti": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
    // },
    // "harakter_DN_22583_22583": {
    //     "source": "file",
    //     "table": "unknown",
    //     "cod_z1": 0,
    //     "cod_i": 0
    // },

    //new futures in osi
    //namira koda v tablicata i vrashta (c)olonata
    // http://osit-lb1:9001/osi/rest/decode/eknm/6813?c=podel -> 513
    //wrashta celiq res za koda i tablicata vav vid na json
    // http://osit-lb1:9001/osi/rest/data/eknm/6813?format=json -> {"row": {"cod":"0", "cod_z":"6813", "dat_akt":"27.03.2007", "dat_ot":"13.02.1999", "dok":"000000", "eknm_5":"68134", "ff":""", "free":"87111200", "ft":"00", "h":"0", "ime_z":"ГР.СОФИЯ", "kmetstvo":"00", "kodais":"99", "next_z":"0", "nivo_z":"0", "nomer":"3", "oblast":"22", "obs_okr":"46", "obstina":"46", "okr":"21", "otd_nm":"0", "podel":"513", "prehv_nm":"0", "table":"eknm", "ter_cod":"6813", "valid":"0", "vid":"11", "wcod":"1", "zip_kode":"1000"}}


    //loaded from server
    "grajdanstvo": {
        // http://osit-lb1:9001/osi/rest/hiera/durjavi/0/6650?format=json&t=simple
        "source": "url",
        "table": "durjavi",
        "cod_z1": 6650,
        "cod_i": 0
    },
    "eknm": {
        "source": "url",
        "table": "eknm",
        "cod_z1": 10371,
        "cod_i": 0
    },
    "ulici_hie": {
        // "sorce": "https://osit-lb1:9001/osi/rest/hiera/ulici/0/eknm_cod?t=simple&format=json",
        "source": isInContainer ? location.origin+"/osi/rest/hiera/ulici/0/eknm_cod?t=simple&format=json" : "https://appps.mvr.bg/osi/rest/hiera/ulici/0/eknm_cod?t=simple&format=json",
        "table": "no",
        "cod_z1": 0,
        "cod_i": 0
    },
    "ulici_dec": {
        // "sorce": "https://osit-lb1:9001/osi/rest/hiera/ulici/0/eknm_cod?t=simple&format=json",
        "source": isInContainer ? location.origin+"/osi/rest/data/ulici/ul_cod?t=simple&format=json" : "https://appps.mvr.bg/osi/rest/data/ulici/ul_cod?t=simple&format=json",
        "table": "no",
        "cod_z1": 0,
        "cod_i": 0
    },
    "podelenia": {
        //http://osit-lb1:9001/osi/rest/hiera/podl/12420/12420?format=json
        "source": "url",
        "table": "podl",
        "cod_z1": 12420,
        "cod_i": 12420
    },
    "stepen_obrazovanie": {
        //http://osit-lb1:9001/osi/rest/hiera/obr/18729/6765?format=json
        "source": "url",
        "table": "obr",
        "cod_z1": 6765,
        "cod_i": 18729
    },
    "ikonom_aktivnost": {
        //http://osit-lb1:9001/osi/rest/hiera/soc_poloj/19354/19354?format=json
        "source": "url",
        "table": "soc_poloj",
        "cod_z1": 19354,
        "cod_i": 19354
    },

    "vid_dok": {
        //http://osit-lb1:9001/osi/rest/hiera/vid_dok/22582/22582?format=json
        "source": "url",
        "table": "vid_dok",
        "cod_z1": 22582,
        "cod_i": 22582
    },
    "vid_lichen_dok": {
        //http://osit-lb1:9001/osi/rest/hiera/vid_dok/6813/6813?format=json
        "source": "url",
        "table": "vid_dok",
        "cod_z1": 6813,
        "cod_i": 6813
    },
    "otnoshenie_s_liceto": {
        //http://osit-lb1:9001/osi/rest/hiera/otnoshenie/22581/22581?format=json
        "source": "url",
        "table": "otnoshenie",
        "cod_z1":22581,
        "cod_i": 22581
    },
    "vid_nasilie": {
        //http://osit-lb1:9001/osi/rest/hiera/okraska/22583/22583?format=json
        "source": "url",
        "table": "okraska",
        "cod_z1":22583,
        "cod_i": 22583
    },
    "ocenka_na_riska": {
        //http://osit-lb1:9001/osi/rest/hiera/drugi/22584/22584?format=json
        "source": "url",
        "table": "drugi",
        "cod_z1":22584,
        "cod_i": 22584
    },
    "nachin_na_post_na_signal": {
        //http://osit-lb1:9001/osi/rest/hiera/nachin/22657/22657?format=json
        "source": "url",
        "table": "nachin",
        "cod_z1":22657,
        "cod_i": 22657
    },
    "nasochavene_kam_institucia": {
        //http://osit-lb1:9001/osi/rest/hiera/masto/22660/22660?format=json
        "source": "url",
        "table": "masto",
        "cod_z1":22660,
        "cod_i": 22660
    },
    "tochki_na_komunikacia": {
        //http://osit-lb1:9001/osi/rest/hiera/opis_vesht/19382/19382?format=json
        "source": "url",
        "table": "opis_vesht",
        "cod_z1":19382,
        "cod_i": 19382
    },
    "momentno_sustoqnie": {
        //http://osit-lb1:9001/osi/rest/hiera/sust_lice/19209/19209?format=json
        "source": "url",
        "table": "sust_lice",
        "cod_z1":19209,
        "cod_i": 19209
    },
    
    // "navici_i_naclonnosti": {
    //     //http://osit-lb1:9001/osi/rest/hiera/haracter/7155/7155?format=json
    //     "source": "url",
    //     "table": "haracter",
    //     "cod_z1":7155,
    //     "cod_i": 7155
    // },
    "mqsto_na_incidenta": {
        //http://osit-lb1:9001/osi/rest/hiera/masto/22674/22674?format=json
        "source": "url",
        "table": "masto",
        "cod_z1":22674,
        "cod_i": 22674
    },
    "haracteristiki_na_postradaliq": {
        //http://osit-lb1:9001/osi/rest/hiera/sust_lice/22682/22682?format=json
        "source": "url",
        "table": "sust_lice",
        "cod_z1":22682,
        "cod_i": 22682
    },
    "naranqvaniq_na_postradalia": {
        //http://osit-lb1:9001/osi/rest/hiera/nachin/22705/22705?format=json
        "source": "url",
        "table": "nachin",
        "cod_z1":22705,
        "cod_i": 22705
    },
   
    "nachin_na_naranqvane": {
        //http://osit-lb1:9001/osi/rest/hiera/nachin/22687/22687?format=json
        "source": "url",
        "table": "nachin",
        "cod_z1":22687,
        "cod_i": 22687
    },
    "haracteristiki_na_izvarshitelq": {
        //http://osit-lb1:9001/osi/rest/hiera/kat_lice/22696/22696?format=json
        "source": "url",
        "table": "kat_lice",
        "cod_z1":22696,
        "cod_i": 22696
    },
    "rayonen_okrujen_sud": {
        //http://osit-lb1:9001/osi/rest/hiera/podl/12891/12891?format=json
        "source": "url",
        "table": "podl",
        "cod_z1":12891,
        "cod_i": 12891
    },
    "nalojeni_merki": {
        //http://osit-lb1:9001/osi/rest/hiera/prest/8148/8148?format=json
        "source": "url",
        "table": "prest",
        "cod_z1":8148,
        "cod_i": 8148
    },
    "narushena_zapoved": {
        //http://osit-lb1:9001/osi/rest/hiera/prest/8232/8232?format=json
        "source": "url",
        "table": "prest",
        "cod_z1":8232,
        "cod_i": 8232
    },
    "nasilie_osnovano_na_pola": {
        //http://osit-lb1:9001/osi/rest/hiera/prest/8229/8229?format=json
        "source": "url",
        "table": "prest",
        "cod_z1":8229,
        "cod_i": 8229
    },
    "rezultati_spravka_kos": {
        //http://osit-lb1:9001/osi/rest/hiera/drugi/22807/22807?format=json
        "source": "url",
        "table": "drugi",
        "cod_z1":22807,
        "cod_i": 22807
    },
    "da_ne": {
        //http://osit-lb1:9001/osi/rest/hiera/drugi/22671/22671?format=json
        "source": "url",
        "table": "drugi",
        "cod_z1":22671,
        "cod_i": 22671
    },
    "zavisimosti":{
        //http://osit-lb1:9001/osi/rest/hiera/haracter/22776/22776?format=json
        "source": "url",
        "table": "haracter",
        "cod_z1":22776,
        "cod_i": 22776
    },

    "navici_i_naclonnosti_vict":{
        //http://osit-lb1:9001/osi/rest/hiera/haracter/22758/22758?format=json
        "source": "url",
        "table": "haracter",
        "cod_z1":22758,
        "cod_i": 22758
    },

    "navici_i_naclonnosti_perp":{
        //http://osit-lb1:9001/osi/rest/hiera/haracter/22759/22759?format=json
        "source": "url",
        "table": "haracter",
        "cod_z1":22759,
        "cod_i": 22759
    }

    

};

//get table info from servers for changes
function ajaxTableInfo() {
    let from_ls = localStorage.getItem('tables_time_update');
    if (from_ls !== null) {
        times_from_storage = JSON.parse(from_ls);
    }
    else {
        times_from_storage = {};
    }
    // var url = 'https://osit-lb1:9001/osi/admin/tables/info';
    var url = isInContainer ? '/osi/admin/tables/info' : 'https://appps.mvr.bg/osi/admin/tables/info';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function (data) {
            var arr = data.split(";");
            for (var i = 0; i < arr.length; i++) {
                var arr_n = arr[i].split("=");
                times_from_grid[arr_n[0]] = arr_n[1];
            }
            update_tables();
        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log("ajaxTableInfo");
            console.log(jqxhr.status);
            console.log(errorThrown.toString());
        }
    });

}

function get_hiera_from_grid(hiera_item) {

    // console.log(hiera_item + "  --- grid"); //remove
    let url = isInContainer ? `/osi/rest/hiera/` : `https://appps.mvr.bg/osi/rest/hiera/`;
    url += `${hieras_for_load[hiera_item].table}/${hieras_for_load[hiera_item].cod_i}/${hieras_for_load[hiera_item].cod_z1}?format=json&t=simple`;
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            if (hieras_for_load[hiera_item].table === "podl"){
                if (data.hiera.row.cod_z * 1 === 3286){
                    data.hiera.row.ime_z = "ГДНП";
                }
            }
            localStorage.setItem(hiera_item, JSON.stringify(data));
        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log("get_hiera_from_grid error");
            console.log(jqxhr.status);
            console.log(errorThrown.toString());
        }
    });
}

function get_hiera_from_file(hiera_item) {
    $.ajax({
        url: '../assets/hiera_files/' + hiera_item + '.json',
        dataType: 'json',
        success: function (data) {
            localStorage.setItem(hiera_item, JSON.stringify(data));
        }
    });
}

//update localstorage hieras if time for hieras from grid is bigger from time in localstorage
function update_tables() {
    let hiera_names = [];
    for (var i = 0; i < localStorage.length; i++) {
        hiera_names.push(localStorage.key(i));
    }
    //=======================================================
    for (var item in hieras_for_load) {
        //special case for ulici
        if (hieras_for_load[item].table === 'no') {
            localStorage.setItem(item, hieras_for_load[item].source);
            continue;
        }
        //add hieras from grid
        if (hieras_for_load[item].source === undefined || hieras_for_load[item].source === "url") {
            //            ---------------------------------------------------------------------------------
            if (!hiera_names.includes(item)) {
                times_from_storage[hieras_for_load[item].table] = Date.now();
                get_hiera_from_grid(item);
            } else {
                let date_info = new Date(times_from_grid[hieras_for_load[item].table]);
                let date_storage = new Date(times_from_storage[hieras_for_load[item].table]);
                if (date_info > date_storage) {
                    times_from_storage[hieras_for_load[item].table] = Date.now();
                    get_hiera_from_grid(item);
                }
            }
        }
        //        --------------------------------------------------------------------------------------
        //add hieras from file
        else {
            //                    this "else" will be deleted when all hieras are in the grid
            if (!hiera_names.includes(item))
                get_hiera_from_file(item);
        }

    }
    localStorage.setItem('tables_time_update', JSON.stringify(times_from_storage));
}


function load_hieras() {
    window.app_spinner.show();
    // $(document).ajaxStart(function () {
    //     window.app_spinner.show();

    // });
    $(document).ajaxStop(function () {
        window.app_spinner.hide();
        $(this).unbind('ajaxStop');
    });
    localStorage.clear();
    ajaxTableInfo();
    //wait to load all hieras!!!
    //window.app_spinner.create();



}

$(document).ready(function () {
    load_hieras();
});

