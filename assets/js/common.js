var isAuthenticated = false;
const logout_url = "http://localhost:9000/connect/v1/logout";
const client_id = "aca392b5-e4a7-43fa-aa94-3c6f5b5211f1";

const post_logout_redirect_uri = window.location.origin;
const change_password_url = "http://localhost:9000/oauth2/v1/change-password";

//Jivko Added 28.02.2024 - base URL

const URL_TO_USE = 'https://domestic-violence.apps.dos.mvr.bg/rest/domestic-violence';
// const URL_TO_USE = 'https://appps.mvr.bg/rest/domestic-violence';
// const URL_TO_USE = 'http://dev1402.mvr.bg:9090/domestic-violence'; // Ico backend-app
// const URL_TO_USE = 'http://dev2103.mvr.bg:9090/domestic-violence'; // Ceco backend-app

// $(document).ready(async function () {

let token = sessionStorage.getItem("access_token");

if (token) {
    isAuthenticated = true;
    let access = parseJWT(token);
    $("#user_name").text(access.sub);
    var scopes = access.roles;
    if (!scopes.includes('DNADM')) {
        $("#admin").remove();
    }
}
//Долния код да се премести в код само за индексната страница
let url = new URL(location);
let code = url.searchParams.get("code");

if (code) {
    window.history.replaceState(null, '', window.location.pathname);
    getToken(code);
}//край на коментара
let changePasswordStatus = url.searchParams.get("status");
if (changePasswordStatus) {
    let message = url.searchParams.get("message");
    window.history.replaceState(null, '', window.location.pathname);
    if (changePasswordStatus === 200) {
        createModal("success", message, false)
    } else {
        createModal("error", message, false);
    }
}

if (!isAuthenticated && window.location.pathname !== "/") {
    window.location.assign("/");
}
// dymamicContentBasedOnPermissions(client_id);

// });



function changePassword() {
    if (checkAccessTokenExpiration()) {
        createModal("error", 'Вашата сесия е изтекла', true, function () {
            sessionStorage.clear();
            window.location = "/";
        });
    }
    createModal("error", "Може да загубите въведените до момента данни.", true, function () {
        let redirectUrl = new URL(change_password_url);
        redirectUrl.searchParams.set("client_id", client_id);
        redirectUrl.searchParams.set("redirect_uri", window.location.origin + "/home/events.html");
        redirectUrl.searchParams.set("code_verifier", sessionStorage.getItem("code_verifier"));
        window.location.href = redirectUrl.toString();
    });

};

function signOut() {
    let idToken = sessionStorage.getItem("id_token");
    $.ajax({
        contentType: "text/plain",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'POST',
        url: logout_url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { "id_token_hint": idToken, "client_id": client_id, "post_logout_redirect_uri": post_logout_redirect_uri },
        success: function (data) {
            sessionStorage.clear();
            isAuthenticated = false;
            location.replace("/");
        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log(errorThrown);
            sessionStorage.clear();
            isAuthenticated = false;
            location.replace("/");
        }
    });
}
function parseJWT(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function createModal(status, message, needInteractive, callback) {

    $('#modalForMessages .modal-body').text(message);
    $('#modalForMessages').modal('show');

    if (needInteractive) {

        $('#modalForMessages #redirectToEditLogin').css('display', "")
    } else {
        $('#modalForMessages #redirectToEditLogin').css('display', "none")
    }
    $(' #redirectToEditLogin').off().on('click', function () {
        $('#modalForMessages').modal('hide');
        callback();
    });

    if (status === 'error') {

        $('#modalForMessages .modal-header').html('<h1 class="modal-title fs-5" id="message"><i class="fas fa-exclamation text-danger px-2"></i>Внимание</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');
    }

    else if (status == 'success') {

        $('#modalForMessages .modal-header').html('<h1 class="modal-title fs-5" id="message"><i class="fas fa-check text-success px-2"></i>Завършен</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>');

    }
}

//initialize spinner for loading process
var app_spinner = {
    show: function () {
        $('#app_spinner').show();
        $('.overlay-spinner').show();
    },
    hide: function () {
        $('#app_spinner').hide();
        $('.overlay-spinner').hide();
    }
};

function checkAccessTokenExpiration() {
    access_token = sessionStorage.getItem('access_token');
    var access = parseJWT(access_token);
    if (access.exp < Date.now() / 1000) {
        return true;
    }
    return false;
}

//moved by HDonev 26.03.2026
function getLogedUserDetails() {
    let slujInfo = sessionStorage.getItem("id_token");
    if (slujInfo) {
        isAuthenticated = true;
        let details = parseJWT(slujInfo);
        $('#slujName').val(details.user.name + " " + details.user.surname);
        $('#slujName').attr('slujCode', details.user.sidSl);
        $('#slujName').attr('slujLSid', details.user.sidO);
        $('#slujName').attr('slujLPnr', details.user.pnrO);
        $('#slujPodl').val(details.user.subdivisionTxt);
        $('#slujPodl').attr('podlCode', details.user.subdivisionCode);
    }
}
