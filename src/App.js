import React from 'react';
import $ from 'jquery';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.API_KEY="AIzaSyDiTJ-eKfGFJZUmKvyjkg1JfKuh_wCbJGo";
    this.search='Tech Trends';
    this.max=15;
    this.order="relevance";
    this.count=15;
  }

  startSearch = (event)=>{
    $("#videos").empty();    
    event.preventDefault();    
    this.search=$("#search").val();
    this.order=$("select").val() || "Relevance";    
    this.max=$("#maxresult-input").val()||15;    
    this.count=this.max;
    this.videoSearch(this.API_KEY,this.search,this.max,this.order,this.count);
  }

  videoSearch=(key,search,max,orderBy,count)=>{
    
      $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults="+max+"&q="+search+"&order="+orderBy,function(data){
        console.log(data);
        let videos=data.items;
        let n=videos.length;
        for(var i=max-count;i<max;i++){
          let item=videos[i%n];
          let video = ` 
          <iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
          `

          $("#videos").append(video)
        }
      });
  }
  componentDidMount(){

      window.addEventListener('scroll', this.handleOnScroll);
      this.videoSearch(this.API_KEY,this.search,this.max,this.order,this.count);
  
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  handleOnScroll =  () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {      
      this.max=this.max+this.count;
      this.videoSearch(this.API_KEY,this.search,this.max,this.order,this.count);
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
            <input type="submit" id="form-submit" className="btn btn-danger" value="search" onClick={this.startSearch}/>
          </div>
          <div className="form-group" style={{margin: "10px"}} >
            <input type="number" id="maxresult-input" placeholder="Max Results" min="10" max="50"/>
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