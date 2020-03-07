//////////////////////////////////


var request = function() {
    var key = "MuiAyqnLzhaxkkaJNHK5A5i1cuzJeV5M";
    var data = {
        "sort" : "relevance",
        "api-key" : key,
        "q" : $("#inputSearch").val(),
    };
    
    if (formatDate($("#startYear").val())){
        data["begin_date"] = formatDate($("#startYear").val());
    }

    if (formatDate($("#endYear").val())){
        data["end_date"] = formatDate($("#endYear").val());
    }

    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        data: data,
        success: function(result) {
            console.log(result.status);
        },
        error: function(error) {
            console.log(error);
        }
    }).done(function(result){
        console.log(result);
        $("#resultsDiv").empty();
        var abstracts = $("<div>");
        result.response.docs.forEach((element) => {
            var link = $("<a>");
            abstracts.append(element.snippet);
            link.attr("href", element.web_url);
            link.text(element.web_url);
            abstracts.append("<br>");
            abstracts.append(link);
            abstracts.append("<br>");
            abstracts.append("<br>");
            console.log("appending item...");
        });
        $("#resultsDiv").append(abstracts);
    });
}

function submit() {
    event.preventDefault();
    request();
}

function formatDate(date){  
    var date = moment(date).format('YYYYMMDD');
}



//Event Handlers
$(document).on("click", "#searchButton", submit);