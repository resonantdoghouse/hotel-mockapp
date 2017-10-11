// Font style for console.log %c
c = "color:coral;font-weight:bold;font-size:16px;line-height:30px;";
b = "color:white;font-weight:bold;font-size:16px;background:cornflowerblue;padding:5px 20px;line-height:30px;";
g = "color:darkgreen;font-weight:bold;font-size:14px;line-height:30px;";
i = "color:cornflowerblue;font-weight:bold;font-size:14px;line-height:30px;background:ivory;line-height:30px;";
k = "color:slategray;font-weight:normal;font-size:14px;background:whitesmoke;padding: 3px 10px;line-height:25px;"


var output = '<p>Welcome, please open your console.<br><strong>&#8997; option + &#8984; command + j</strong></p>';
// output += '<h2>cool</h2>';


// Check if local storage is available
if (typeof (Storage) !== "undefined") {
    console.log('local storage allowed. Enjoy booking hotel rooms! 😀');
} else {
    alert('Sorry! No Web Storage support.');

}

if (localStorage.getItem('roomsBooked')) {
    console.log('roomsBooked data persists');
} else {
    localStorage.setItem('roomsBooked', 25);
}

/**
 * Controls
 */
$('#check-availability').on('click', function () {
    hotel.checkAvail();
});

$('#book-room').on('click', function () {
    hotel.bookRoom();
});

$('#about').on('click', function () {
    hotel.about();
})


/**
 * hotel object
 */
var hotel = {
    name: 'Quay',
    booked: parseInt(localStorage.getItem('roomsBooked')),
    roomTypes: {
        twin: {
            numberOfRooms: 20
        },
        double: {
            numberOfRooms: 10
        },
        suite: {
            numberOfRooms: 10
        }
    },
    // list total number of rooms
    totalRooms: function () {
        var totalRooms = this.roomTypes.twin.numberOfRooms +
            this.roomTypes.double.numberOfRooms +
            this.roomTypes.suite.numberOfRooms;
        return totalRooms;
    },
    // current number of rooms booked
    roomsBooked: function () {
        var currentRoomsBooked = this.booked;
        return currentRoomsBooked;
    },
    // check room availability
    checkAvail: function () {
        var roomsAvailable = this.totalRooms() - this.roomsBooked();

        output = 'There are 🛌  &nbsp;' + roomsAvailable + ' rooms available';

        updateOutput();
        return roomsAvailable;
    },
    availableRooms: function () {
        var roomsAvailable = this.totalRooms() - this.roomsBooked();
        return roomsAvailable;
    },
    // book a room
    bookRoom: function () {
        if (this.booked < this.totalRooms()) {

            var roomsToBook = prompt('How many rooms would you like?', 1);

            if (roomsToBook < this.availableRooms()) {
                this.booked = this.booked + parseInt(roomsToBook);

                console.log('%cRoom(s) booked ✅', k);

                localStorage.setItem('roomsBooked', this.booked);
                output = 'Room(s) booked ✅';
                updateOutput();
            } else {
                console.log('%cNot enough rooms available. 🙁', k);
                output = 'Not enough rooms available. 🙁';
                updateOutput();
            }
        } else {
            console.log('%cNo rooms left 😿', k);
            localStorage.setItem('roomsBooked', this.booked);

            output = 'No rooms left 😔';
            updateOutput();
        }

        return this.booked;
    },
    // Checkout of a room
    checkout: function () {
        if (this.booked !== 0) {

            var roomsToCheckout = parseInt(prompt('How many rooms to checkout?', 1));

            if (roomsToCheckout > 0 && (this.availableRooms() + roomsToCheckout) <= this.totalRooms()) {
                this.booked = this.booked - parseInt(roomsToCheckout);

                console.log('%cChecked out of room: 📙', k);
                localStorage.setItem('roomsBooked', this.booked);
                output = 'Checked out of room 👍';

                this.totalRooms();
                updateOutput();

            } else {
                console.log('error, can not be less than 0');
                return;
            }


        } else {
            console.log('no rooms to checkout of');
        }

        return this.booked;
    },
    table: function () {
        // Output table of hotel info
        console.log('%cHotel info table', i);
        console.table([
            ['Total rooms', hotel.totalRooms()],
            ['Rooms booked', hotel.roomsBooked()],
            ['Rooms Available', hotel.availableRooms()],
            ['Check room availability', 'hotel.checkAvail();'],
            ['Book a room', 'hotel.bookRoom();'],
            ['Checkout of a room', 'hotel.checkout();']
        ]);
    },
    about: function () {
        output = "<h2>About " + this.name + "</h2>Pommy ipsum wedding tackle balderdash a bottle of plonk well chuffed fish and chips taking the mick baffled Sherlock, one off air one's dirty linen bit of a Jack the lad stop arsing around on the beat know your onions come hither, black pudding ended up brown bread knows bugger all about nowt chin up air one's dirty linen Kate and Will farewell. Devonshire cream tea the chippy bangers and mash bent as a nine bob note, alright duck. Working class in a pickle any road, best be off in the jacksy, nigh. Wibbly-wobbly timey-wimey stuff it's me peepers absolute knee high to a grasshopper i'll be a monkey's uncle, laughing gear curry sauce one feels that, flabbergasted Dr. Watson. Her Majesty's pleasure throw a spanner in the works rubbish it's just not cricket pennyboy, stop arsing around drizzle argy-bargy.";
        updateOutput();
    }
}

// Welcome message
console.log('%cWelcome to 🏨 ' + hotel.name, c);
console.log('%cWe Currently have ' + hotel.availableRooms() + ' 🛌 Rooms available', b);
console.log('%c💰 Rooms Booked ' + hotel.roomsBooked(), c);
console.log('%cAvailable commands:\n hotel.checkAvail(); \n hotel.bookRoom(); \n hotel.checkout(); \n hotel.about(); \n hotel.table();', k);


var updateOutput = function () {
    var el = document.getElementById('hotels'),
        // Make a new div
        elChild = document.createElement('div');

    // Give the new div some content
    elChild.innerHTML = output;

    // Jug it into the parent element
    el.prepend(elChild);
}

updateOutput();