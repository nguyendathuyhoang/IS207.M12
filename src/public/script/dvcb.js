function update(){
    var weight = $('#baggage_weight option:selected').val();
    var food = [];
    var boxes = $('input[class="form-check-input"]:checked');
    for(var i=0;i<boxes.length;i++){
        food.push(boxes[i].value);
    }
    weight_dict = {0:0, 1:180000, 2:210000, 3:270000, 4:380000};
    food_dict = {'option1':80000, 'option2': 120000, 'option3': 120000, 'option4': 115000, 'option5': 90000, 
    'option6': 100000, 'option1_1': 40000, 'option2_1': 50000, 'option3_1': 65000};
    var total = 0;
    total += weight_dict[weight];
    for(var i=0;i<food.length;i++)
    {
        total += food_dict[food[i]];
    }
    result_html = "<p id='total' style='font-size: 40px; text-align: end; color: #eb1357;'>Tổng cộng: ";
    result_html += total;
    result_html += "đ</p>";
    $('#total').html(result_html);
}

$(document).ready(function(){
    $('#login').submit(function(event){
        event.preventDefault();
        let ma = $('#madatcho').val();
        let hoten = $('#hovaten').val();
        $.ajax({
            type:'POST',
            url: '/dvcb_login',
            data: JSON.stringify({"code": ma, "name": hoten}),
            dataType: "json",
            contentType: 'application/json',
            success: function(res){
                if(res.respond=='fail')
                    $("#check_result").html("<p>Sai thông tin</p>")
                else
                    window.location = '/dichvuchuyenbay_2.ejs/code/' + ma;
            }
        })
    })

    $('#baggage_weight').change(function(){
        update()
    });

    $('.form-check-input').change(function(){
        update()
    });

    $("button#submit").click(function(){
        var code  = window.location.href.split('/');
        code = code[5]
        var weight = $('#baggage_weight option:selected').val();
        var food = [];
        var boxes = $('input[class="form-check-input"]:checked');
        food_dict = {'option1':'1', 'option2': '2', 'option3': '3', 'option4': '4', 'option5': '5', 
        'option6': '6', 'option1_1': '7', 'option2_1': '8', 'option3_1': '9'};
        for(var i=0;i<boxes.length;i++){
            food.push(food_dict[boxes[i].value]);
        }
        $.ajax({
            type:'POST',
            url: '/dvcb_preorder',
            data: JSON.stringify({"weight": weight, "food": food, "code": code}),
            dataType: "json",
            contentType: 'application/json',
            success: function(res){
                alert("Đặt dịch vụ thành công")
                $('body').html("<p style='text-align:center; font-size:60px'>Bạn đã đặt dịch vụ thành công, hãy quay về trang chủ ^^</p>")
                window.location = '/'
            }
        })
    })
})