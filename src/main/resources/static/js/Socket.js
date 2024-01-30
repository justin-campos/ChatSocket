var stompClient = null;
var name;
var lastSender = "";  // Variable para rastrear el último remitente

function connect() {
    var socket = new SockJS('http://localhost:8080/websocket-example');
    stompClient = Stomp.over(socket);

    // Verifica si ya estás conectado antes de intentar conectarte nuevamente
    if (stompClient.connected) {
        console.log('Ya estás conectado.');
        return;
    }

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        // Verifica si ya estás suscrito antes de realizar una nueva suscripción
        var existingSubscription = stompClient.subscriptions['/topic/greetings'];
        if (!existingSubscription) {
            stompClient.subscribe('/topic/greetings', function (greeting) {
                var greetingObject = JSON.parse(greeting.body);
                showGreeting(greetingObject);
            });
        }
    });
}


function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function nombre() {
    name = $("#name").val();
}


function sendName() {
    var message = $("#message").val();

    var dataToSend = {
        'name': name,
        'message': message
    }

    stompClient.send("/app/hello", {}, JSON.stringify(dataToSend));
}


function showGreeting(greeting) {
    console.log("nombre usuario", name);

    var formattedMessage = greeting.nameContent + ": " + greeting.messageContent;

    // Verifica si el remitente ha cambiado
    if (lastSender !== greeting.nameContent) {
        // Muestra un encabezado con el nombre del remitente
        $("#greetings").prepend("<tr><td><strong>" + greeting.nameContent + "</strong></td></tr>");
        lastSender = greeting.nameContent;
    }

    $("#greetings").prepend("<tr><td>" + formattedMessage + "</td></tr>");

    if (name === greeting.nameContent) {
        $("#MensajeVista").append("<div class='col-sm-12 message-main-sender'><div class='sender'><div class='message-text'>" + formattedMessage + "</div><span class='message-time pull-right'>Sun</span></div></div>");
    } else {
        $("#MensajeVista").append("<div class='col-sm-12 message-main-receiver'><div class='receiver'><div class='message-text'>" + formattedMessage + "</div><span class='message-time pull-right'>Sun</span></div></div>");
    }
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#nombre").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendName();
    });
    $("#nombre").click(function () {
        nombre();
    });
});
