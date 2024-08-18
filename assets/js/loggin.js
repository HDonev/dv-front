//да се преместят на подходящо място за да не се четат през инспектора
const authorize_url = "http://localhost:9000/oauth2/v1/authorize";
const redirect_uri = window.location.origin;
const token_url = "http://localhost:9000/oauth2/v1/token";
const scope = "openid";
const response_type = "code"
const code_challenge_method = "S256";
const client_secret = "T0maz01981";
var code_challenge;

async function login() {
    let code_verifier = generateCodeVerifier();
    sessionStorage.setItem("code_verifier", code_verifier);
    code_challenge = await generateCodeChallengeFromVerifier(code_verifier);
    let url = authorize_url + "?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&response_type=" + response_type +
        "&code_challenge_method=" + code_challenge_method + "&code_challenge=" + code_challenge;
    window.location.assign(url);
}


async function getToken(authCode) {
    let params = new URLSearchParams();
    params.set("client_id", client_id);
    params.set("client_secret", client_secret)
    params.set("code", authCode);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", redirect_uri);
    params.set("code_verifier", sessionStorage.getItem("code_verifier"));

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'POST',
        url: token_url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: params.toString(),
        success: function (data) {
            sessionStorage.setItem("access_token", data.access_token);
            sessionStorage.setItem("refresh_token", data.refresh_token);
            sessionStorage.setItem("id_token", data.id_token);
            var id_token = parseJWT(data.id_token);
            var access_token = parseJWT(data.access_token);
            updateEmplyee(id_token.user, access_token.profile);
            location.replace("/home/home_document.html")
        },
        error: function (jqxhr) {
            console.log(jqxhr.status + " " + jqxhr.responseText);
        }
    });
}


function generateCodeVerifier() {
    var array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(32)).substr(-2)).join('');
}
async function generateCodeChallengeFromVerifier(v) {
    hashed = await sha256(v);
    return base64urlencode(hashed);
}

function sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}


function updateEmplyee(user, typeEmployee) {
    var employee = {
        "sid_o": user.sidO,
        "pnr_o": user.pnrO,
        "sid_sl": user.sidSl,
        "egn": user.egn,
        "ime": user.name,
        "prezime": user.middleName,
        "familno": user.surname,
        "tip_sl": typeEmployee,
        //TODO da se vzima rdvr-to ot funkciq po podelenieto
        "rdvr": 513,
        "dljn": user.position,
        "podl_sl": user.subdivisionCode,
        "mrk_akt": user.mrkAkt
    }
    $.ajax({
        type: 'POST',
        url: URL_TO_USE + "/employee",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(employee),
        success: function (data) {
            console.log("OK")
        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log(errorThrown);
            sessionStorage.clear();
            isAuthenticated = false;
            location.replace("/");
        }
    });
}

