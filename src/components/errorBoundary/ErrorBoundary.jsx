import React,{Component} from "react";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error,errorInfo){
        console.log(error,errorInfo)
        this.setState({
            error:true 
        })
    }
    render() {
        return (
            <div>
                {this.state.error?'Something went wrong':this.props.children}
            </div>
        );
    }
}

export default ErrorBoundary;