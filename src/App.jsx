import React from 'react'
import Slide from "./components/Slide";

function Test({text}) {
	return (
		<div className={`flex justify-center text-center items-center h-full text-gray-50 text-4xl font-bold`}>{text}</div>
	)
}

function App() {
	return (
		<React.Fragment>
			<div className={`h-screen bg-red-50`}>
				<Slide
					options={{
						autoPlay: false,
						minHeight: "100vh",
					}}
					imageList={[
						"https://unsplash.com/photos/9pO3LgH-9-Y/download?force=true&w=1920",
						"https://unsplash.com/photos/UqF5yLYlkRk/download?force=true&w=1920",
						"https://unsplash.com/photos/0SsXCXqqDUY/download?force=true&w=1920",
						"https://unsplash.com/photos/SYZYEoEF2sk/download?force=true&w=1920"
					]}
					nodeList={[
						<Test text={`This is some text on the slide`}/>,
						<Test text={`text 2`}/>,
						<Test text={`text 3`}/>
					]}
				/>
			
			</div>
		</React.Fragment>
	);
}

export default App;
