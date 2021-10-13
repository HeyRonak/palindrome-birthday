var dob = document.querySelector("#date");
var btn  = document.querySelector("#Checkbtn");
var output =document.querySelector(".output");


function reverseDate(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseDate(str);
}


function convertDateToStr(date){

    var mydate = {  
        day  : '',
        month : '',
        year : ''
    };

    if( date.day < 10){
        mydate.day = "0"+date.day;
    }else{
        mydate.day = date.day.toString();
    }

    if( date.month < 10 ){
        mydate.month ="0"+date.month;
    }else{
        mydate.month = date.month.toString();
    }

    mydate.year = date.year.toString();
    
    return mydate;

}

function getAllDateFormat(date){

    var DateStr = convertDateToStr(date);

    var ddmmyyyy = DateStr.day + DateStr.month + DateStr.year;
    // var mmddyyyy = DateStr.month + DateStr.day + DateStr.year;
    // var yyyymmdd = DateStr.year  + DateStr.month + DateStr.day;
    // var ddmmyy   = DateStr.day + DateStr.month + DateStr.year.slice(-2);
    // var mmddyy   =  DateStr.month + DateStr.day + DateStr.year.slice(-2);
    // var yymmdd   =   DateStr.year.slice(-2) + DateStr.month + DateStr.day;

    return [ ddmmyyyy];
}

function CheckPalindromeForAllFormats(date){
    
    var formats = getAllDateFormat(date);
    var flag=false;
    
    
    for(var i=0;i<formats.length;++i){
        if(isPalindrome(formats[i])){
            flag=true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year){

    if(year % 4 === 0){
        return true;
    }

    if(year % 100 === 0){
        return false;
    }

    if( year % 400 === 0 ){
        return true;
    }
    
    return false;

}

function getNextDate(date){

    var day = date.day + 1;
    var month= date.month;
    var year = date.year;

    var monthList = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if( isLeapYear(year) ){
            if( day > 29 ){
                day = 1;
                month = month+1;  
            }
        }else{
            if(day > 28){
                day = 1;
                month = month+1;
            }
        }

    }else{
        if(day > monthList[month-1]){
            day = 1;
            month = month+1;
        }
    }

    if(month > 12){
        month=1;
        year += 1;
    }

    return {
        day :day,
        month: month,
        year : year
    };

}

function getNextPalindromeDate(date){
    var count=0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;

        if(CheckPalindromeForAllFormats(nextDate)){
            break;
        }

        nextDate = getNextDate(nextDate);        

    }

    return [count , nextDate];
}


function CheckPalindrome(){

    var date = dob.value;

    if(date !== ""){
        date = date.split('-');
        var dateStr = {
            day : Number(date[2]),
            month : Number(date[1]),
            year : Number(date[0])
        };

       if(CheckPalindromeForAllFormats(dateStr)){
            output.innerText = "Yup! Your birthdate is palindrome.";
       }else{
            var [count , nextDate] = getNextPalindromeDate(dateStr);

            console.log(nextDate); 
            if(nextDate.month < 10){
                nextDate.month = "0"+nextDate.month;   
            }
            output.innerText = "Nearest palindrome date is " +  nextDate.day +"-"+nextDate.month+"-"+nextDate.year  + ",You missed by "+ count + " days.";
       }
       
    }else{
        output.innerText = "Please! Select a valid birthdate.";
    }

}

btn.addEventListener("click" , CheckPalindrome);
