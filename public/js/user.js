$(document).ready(function () {
    $("#login").on('click', function (e) {
        e.preventDefault();
        // var data = $('#userLogin')[0];
        let email = $('#email').val()
        let password = $('#psw').val()
        const data = {
            email,
            password
        }
        console.log(data);
        // let formData = new FormData(data);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: data,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                localStorage.setItem('token', data.access_token)
               

            },
            error: function (error) {
                console.log(error);
            }
        });
    });

})