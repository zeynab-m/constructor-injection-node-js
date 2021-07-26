
class DataTableHelper {









    static renderProjectsAction (data, type, row, meta) {
        console.log({data})
        return `<div>
                    <a class="btn btn-sm btn-primary" title="ویرایش اطلاعات" href="/backOffice/project/edit/index/${data}"><i class="icon icon-edit"></i></a>
                </div>`
    }

    // static excelButtonAction (e, dt, node, config) {
    //
    //     var excelColumns = {};
    //     // console.log({ dd:dt.ajax.url()})
    //
    //     for (var i = 0; i < dt.settings().init().columns.length ; i++) {
    //         // console.log(dt.settings().init().columns[i].data)
    //         // console.log(dt.columns().header()[i].textContent)
    //
    //         var key = dt.settings().init().columns[i].data;
    //         var value = dt.columns().header()[i].textContent;
    //         if(!excelColumns[key]){
    //             excelColumns[key] = value;
    //
    //         }
    //
    //     }
    //
    //     var query = this.mergeObject(dt.ajax.params().query, {
    //         excel: true
    //     });
    //
    //     var data = this.mergeObject(dt.ajax.params(), {
    //         query: query,
    //         excelColumns,
    //         start: '0',
    //         length: dt.page.info().recordsTotal
    //     })
    //
    //
    //     $.ajax({
    //         type: "POST",
    //         url: dt.ajax.url(),
    //         data: data,
    //         beforeSend: function(){
    //             waitingDialog.show("در حال آماده کردن فایل خروجی، لطفا صبور باشید")
    //         },
    //         success: function (data) {
    //             // console.log(data)
    //             window.location = '/datatable/download-excel?file=' + data;
    //             waitingDialog.hide()
    //         },
    //         error: function (request, status, error) {
    //
    //             waitingDialog.showCloseButton().changeMessage('خطایی رخ داده است، لطفا به پشتیبانی اطلاع دهید');
    //         }
    //     })
    // }



    static createDataTable(element, ajaxUrl, columns, queries={}, order=[]) {
        console.log({element, ajaxUrl, columns, queries, order})

        var query = {};

        // let excel =user.role.permissions.export_data?[{
        //     text: 'اکسل',
        //     action: this.excelButtonAction.bind(this)
        // }]:[]


        $.fn.dataTable.ext.errMode = 'none';
        $(element).on( 'error.dt', function ( e, settings, techNote, message ) {
            // console.log( 'An error has been reported by DataTables: ', message );
        }) ;

        return $(element).DataTable({
            processing: true,
            serverSide: true,
            searching: false,
            responsive: true,
            order: order,
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Persian.json"
            },
            ajax: {
                type: "GET",
                url: ajaxUrl,
                data: function (d) {

                    for (var q in queries) {

                        if (queries[q] instanceof $) {
                            query[q] = queries[q].val()
                        } else {
                            query[q] = queries[q]
                        }
                    }

                    d.query = query

                }

            },
            columns: columns,

        });

    }

    static mergeObject(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
}
