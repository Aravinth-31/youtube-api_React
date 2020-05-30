import React from 'react';
import $ from 'jquery';

class  App extends React.Component {
  componentDidMount(){
      
      var API_KEY="AIzaSyDiTJ-eKfGFJZUmKvyjkg1JfKuh_wCbJGo";
      var video="";

      function startSearch(event){
        
        event.preventDefault();    
        var search=$("#search").val();
        var orderBy=$("select").val() || "Relevance";    
        var max=$("#maxresult-input").val()||15;    
        videoSearch(API_KEY,search,max,orderBy);

      }

      $("select").mouseup(function(event) {
        var open = $(this).data("isopen");
        if(open) {
        startSearch(event);
        }
        $(this).data("isopen", !open);
    });

      $("#form-submit").click(function(event){
        startSearch(event);
      })
  
      function videoSearch(key,search,max,orderBy){
    
        $("#videos").empty();    
          $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults="+max+"&q="+search+"&order="+orderBy,function(data){
            console.log(data);
    
            data.items.forEach(item=>{
              video = ` 
              <iframe src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
              `
    
              $("#videos").append(video)
            });
          });
      }
  }

  render(){
    return (
      <div className="container">
      <img src="https://pngimg.com/uploads/youtube/youtube_PNG21.png" width={"15%"} alt="Loading"/>
      <form id="form">
        <div style={{display:"flex"}}>
          <div className="form-group" style={{margin: "10px",width: "70%"}}>
            <input className="form-control" type="text" id="search"></input>
          </div>
          <div className="form-group" style={{margin: "10px"}}>
            <input type="submit" id="form-submit" className="btn btn-danger" value="search"/>
          </div>
          <div className="form-group" style={{margin: "10px"}} >
            <input type="number" id="maxresult-input" placeholder="Max Results" min="1" max="50"/>
          </div>
          <div style={{margin: "10px"}} className="form-group">
            <select id="order-input" defaultValue={{ label: "Relevance", value: "Relevance" }} >
                      <option value="">--SELECT ORDER--</option>
                      <option value="date">Date</option>
                      <option value="rating">Rating</option>
                      <option value="relevance">Relevance</option>
                      <option value="title">Title</option>
                      <option value="viewCount">View Count</option>
                  </select>
          </div>
        </div>
      </form>
      <br/>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div id="videos"></div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
