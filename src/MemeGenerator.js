/** Opening Comments : 
 * Initialize state to save the following data:
 *      top text
 *      bottom text
 *      random image (intialize with "http://i.imgflip.com/1bij.jpg")
 */

  /** Second Opening Comments : 
     * We'll be using an API that provides a bunch of meme images.
     * 
     * #TODO for the Task which I have to perform here : 
     * make an API call to "https://api.imgflip.com/get_memes" and save the 
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that comes back is an array)
     */
    /** Third Opening Comments :
     * Create the onChange handler method
     * It should update the corresponding state on every change of the input box
     */
    /*
    Few Key Points which we need to remember about : 

    */


import React from "react"

class MemeGenerator extends React.Component{

    constructor(){
        super(); 
        this.state={
            topText : "",
            bottomText : "", 
            randomImg : "http://i.imgflip.com/1bij.jpg",
            allMemeImages : [] //The Random Images which we are getting from the API 
        }
        //Binding the Event Handler to the Component : 
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);     
    }
    //Investigating about this Method . 
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
                .then(response => response.json())
                .then(response => {
                    const {memes} = response.data
                    this.setState({allMemeImages : memes})
                })
    }

    handleChange(event){
      const {name , value} = event.target
      this.setState(
          {[name] : value}
          )
        
    }

    handleSubmit(event){
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })//For Bringing up the Change in the Images . 
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
    
}

export default MemeGenerator