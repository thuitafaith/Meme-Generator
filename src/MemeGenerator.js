import React,{Component} from "react"

 

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state ={
            topText:"",
            bottomText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.genMeme=this.genMeme.bind(this)
    }

    handleChange(event){
        const{name, value} =event.target
        this.setState({
            [name]:value
        })

    }
     


    genMeme(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImage: randMemeImg })
        
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response =>{
                const {memes} = response.data
                this.setState({
                    allMemeImgs:memes 
                })
            })
    }
    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.genMeme}>
                    <input type="text" value={this.state.topText} onChange={this.handleChange} name="topText" placeholder="Top Text"/>
                    <br/>
                    <input type="text" value={this.state.bottomText} onChange={this.handleChange} name="bottomText" placeholder="Bottom Text"/>
                    
                    <hr/>
                    <button>GENERATE</button>
            

                </form>
                {/* <h1>{this.state.topText} {this.state.bottomText}</h1> */}
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>

        )
    }
}








export default MemeGenerator