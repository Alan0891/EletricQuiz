//Chama a função list uma única vez
$('#startgame').click(()=>{
  list()
  return false
})

//Monta o layout com as questões
function mount(response){
  let question 
  response.forEach((x,y)=>{
    question = x
  })

  $('.modal-title').html(question.id +"- "+ question.question + "?")
  $('#resp1').val(question.opt1)
  $('#resp2').val(question.opt2)
  $('#resp3').val(question.opt3)
  $('#resp4').val(question.opt4)
  
  $('#resp1label').html(question.opt1)
  $('#resp2label').html(question.opt2)
  $('#resp3label').html(question.opt3)
  $('#resp4label').html(question.opt4) 

  return question
}

//Trata o resultado final
function result(success,errors){
  let status  
  if((success - errors) <= 5){
     status = 'péssimo'
     $('.result').removeClass('alert alert-success')
     $('.result').removeClass('alert alert-warning')
     $('.result').html('&nbsp Seu resultado foi '+ status + ' ,total de pontos : ' + (success-errors)).css('font-height','bold')
     $('.result').addClass('alert alert-danger')
     $('.result').prepend('<i class="far fa-tired fa-3x"></i>')
     $('.result').show()
     $('.result').fadeOut(5000)
    }
  if((success - errors) > 5 && (success - errors) <= 7) {
    status = 'bom'
     $('.result').removeClass('alert alert-success')
     $('.result').removeClass('alert alert-danger')
     $('.result').html('&nbsp Seu resultado foi '+ status + ' ,total de pontos : ' + (success-errors)).css('font-height','bold')
     $('.result').addClass('alert alert-warning')
     $('.result').prepend('<i class="fas fa-meh fa-3x"></i>')
     $('.result').show()
     $('.result').fadeOut(5000)
  }
  if((success - errors) > 7 && (success - errors) <= 10) {
    status = 'parabéns'
    $('.result').removeClass('alert alert-danger')
    $('.result').removeClass('alert alert-warning')
    $('.result').html('&nbsp Seu resultado foi '+ status + ' ,total de pontos : ' + (success-errors)).css('font-height','bold')
    $('.result').addClass('alert alert-success')
    $('.result').prepend('<i class="fas fa-grin-stars fa-3x"></i>')
    $('.result').show()
    $('.result').fadeOut(5000)
  }
  if((success - errors) > 10) status = 'genial'
    success = 0
    errors = 0
}

function list(){
    
  prom().then(response=>{

    var resp = mount(response)

      $('#formquiz').on('change','input[name=resp]',(e)=>{
        e.preventDefault()
        check = $('input:radio:checked').val()
      })

      var success = 0
      var errors = 0

      $('#closed').click((e)=>{
      e.preventDefault()  
       result(success,errors)
      })

      $('#send').click((e)=>{
      e.preventDefault()
    
      if(check === resp.correct){ 
        success++
        $('.response').removeClass('alert alert-danger')
        $('.response').html('Success pontos +' + success).addClass('alert alert-success')
        $('.response').prepend('<i class="fas fa-check"></i>')
        if(success > 0){
          $('.response').show()
        }
        $('.response').fadeOut(1500)
        $('input[name=resp').prop('checked',false)

        prom().then(response=>{
         resp = mount(response)
        })
        return false;
       }else{

        errors++
        $('.response').removeClass('alert alert-success')
        $('.response').html('Error pontos -'+ errors+' ,resposta correta '+ resp.correct ).addClass('alert alert-danger')
        $('.response').prepend('<i class="fas fa-times"></i> ')
        if(errors > 0){
          $('.response').show()
        }
        $('.response').fadeOut(1500)
        $('input[name=resp').prop('checked',false)
       
        prom().then(response=>{
          resp = mount(response)
          })
          return false;
         }
      })  
   })
}

//Faz a requisição ajax para consultar a tabela 
function prom(){
  return new Promise((response,reject)=>{
    $.ajax({
      url:"Question/getQuestion",
      type:"GET",
      dataType:"json",
      success:(data)=>{
        response(data)
      },
      error:(err)=>{
        reject(err)
      }
    })
  })
}
