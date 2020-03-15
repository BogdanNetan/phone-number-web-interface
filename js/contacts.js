window.PhoneBook = {
    API_BASE_URL: "http://localhost:8081/contacts",

    getContacts: function () {
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response)

            PhoneBook.displayContacts(JSON.parse(response));
        })
    },
    deleteContact: function (id) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "DELETE"
        }).done(function () {
            PhoneBook.getContacts();
        })
    },
    getContactRow: function (contact) {
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.secondName}</td>
            <td>${contact.phoneNumber}</td>      
            <td>${contact.email}</td>      
            
           
            <td><a href="#" data-id =${contact.id} class="delete-contact">X</a></td>
            <td><a href="#" data-id =${contact.id} class="add email">add email</a></td>
            <td><a href="#" data-id =${contact.id} class="edit">edit</a></td>
        </tr>`

    },
    createContact: function () {
        let firstNameValue = $("#first-name-field").val();
        let secondNameValue = $("#second-name-field").val();
        let phoneNumberValue = $("#phone-number-field").val();
        let emailValue = $("#email-field").val();


        let requestBody = {
            firstName: firstNameValue,
            secondName: secondNameValue,
            phoneNumber: phoneNumberValue,
            email: emailValue

        };
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        })
    },
    updatePhoneNumberContacts: function (id, phonenumber) {

        let requestBody = {
            phoneNumber: phoneNumberValue,
        };
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "applicaion/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        })
    },
    updateEmailContact: function (id, email) {
        let requestBody = {
            email: email,
        };
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        });
    },

    displayContacts: function (contacts) {
        var tablebody = '';

        contacts.forEach(contact => tablebody += PhoneBook.getContactRow(contact));

        $("#Contacts-table tbody").html(tablebody);
    },
    bindEvents: function () {
        $("#new-contact-form").submit(function (event) {
            event.preventDefault();
            PhoneBook.createContact();
        });
        $("#Contacts-table").delegate(".update-mark", "click", function (event) {
            event.preventDefault();
            let contactId = $(this).data("id");
            $(this).replaceWith($(`<input type="tel" placeholder="Enter new Phone Number" data-id=${contactId} class="phonebook-update">`),
                `<input type="button" data-id=${contactId} value="Submit Changes" class="submit-mark">`);
        });
        $("#Contacts-table").delegate(".email-mark", "click", function (event) {
            event.preventDefault();
            let contactId = $(this).data("id");
            $(this).replaceWith($(`<input type="text" placeholder="Enter New Email Adress" data-id=${contactId} class="email-update">`),
                `<input type="button" data-id=${contactId} value="Submit Changes" class="submitemail-mark">`);
        });
        $("#Contacts-table").delegate(".submitemail-mark", "click", function (event) {
            event.preventDefault();
            let contactId = $(this).data("id");
            let email = $(this).siblings(".email-update").val();
            if (email == null || email == "") {
                console.log("Cannot update with null value");
                $(this).siblings(".email-update").val("");
            } else
                PhoneBook.updateContactsEmail(contactId, email);
        });


        $("#Contacts-table").delegate(".delete-contact", "click", function (event) {
            event.preventDefault();

            let dataId = $(this).data("id");
            PhoneBook.deleteContact(dataId);
        });

        $("#Contacts-table").delegate(".edit", "click", function (event) {
            event.preventDefault();
            let dataId = $(this).data("id");
            PhoneBook.editContacts(dataId);
        });

    }
};
PhoneBook.getContacts();
PhoneBook.bindEvents();
