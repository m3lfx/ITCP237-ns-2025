$(document).ready(function () {

    $('#itable').DataTable({
        ajax: {
            url: "/api/items",
            dataSrc: ""
        },
        dom: 'Bfrtip',
        buttons: [
            'pdf',
            'excel',
            {
                text: 'Add item',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    $("#iform").trigger("reset");
                    $('#itemModal').modal('show');
                    $('#itemUpdate').hide();
                    $('#itemImage').remove()
                }
            }
        ],
        order: [[0, 'desc']],
        columns: [
            { data: 'item_id' },
            {
                data: null,
                render: function (data, type, row) {
                    console.log(data.image_path)
                    // return `<img src="/storage/${data.img_path}"  width="50" height="60">`; 
                    return `<img src=${data.image}  width="50" height="60">`;
                }
            },

            { data: 'description' },
            { data: 'cost_price' },
            { data: 'sell_price' },
            { data: 'stock.quantity' },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class = 'editBtn' id='editbtn' data-id=" + data.item_id + "><i class='fas fa-edit' aria-hidden='true' style='font-size:24px' ></i></a><a href='#'  class='deletebtn' data-id=" + data.item_id + "><i  class='fas fa-trash-alt' style='font-size:24px; color:red' ></a></i>";
                }
            }
        ],
    });

    $("#itemSubmit").on('click', function (e) {
        e.preventDefault();
        var data = $('#iform')[0];
        console.log(data);
        let formData = new FormData(data);
        console.log(formData);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        $.ajax({
            method: "POST",
            url: "/api/items",
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#itemModal").modal("hide");
                var $itable = $('#itable').DataTable();
                // $itable.row.add(data.results).draw(false);
                $itable.ajax.reload()
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#itable tbody').on('click', 'a.editBtn', function (e) {
        e.preventDefault();
        $('#itemImage').remove()
        $('#itemId').remove()
        $("#iform").trigger("reset");
        // var id = $(e.relatedTarget).attr('data-id');
        
        var id = $(this).data('id');
        console.log(id);
        $('#itemModal').modal('show');
        $('<input>').attr({ type: 'hidden', id: 'itemId', name: 'item_id', value: id }).appendTo('#iform');
        
        $('#itemSubmit').hide()
        $('#itemUpdate').show()

        $.ajax({
            method: "GET",
            url: `http://localhost:8000/api/items/${id}`,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#desc').val(data.description)
                $('#sell').val(data.sell_price)
                $('#cost').val(data.cost_price)
                $('#qty').val(data.stock.quantity)
                $("#iform").append(`<img src=" ${data.image}" width='200px', height='200px' id="itemImage"   />`)

            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    $("#itemUpdate").on('click', function (e) {
        e.preventDefault();
        var id = $('#itemId').val();
        console.log(id);
        var table = $('#itable').DataTable();
        // var cRow = $("tr td:eq(" + id + ")").closest('tr');
        var data = $('#iform')[0];
        let formData = new FormData(data);
        formData.append("_method", "PUT")
      
        $.ajax({
            method: "POST",
            url: `http://localhost:8000/api/items/${id}`,
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#itemModal').modal("hide");

                table.ajax.reload()

            },
            error: function (error) {
                console.log(error);
            }
        });
    });
})