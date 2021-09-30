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
						imagesEachSlide: 2,
						nav: true,
					}}
					imageList={[
						"https://unsplash.com/photos/AsJirOOLN_s/download?force=true&w=1920",
						"https://unsplash.com/photos/gG70fyu3qsg/download?force=true&w=1920",
						"https://unsplash.com/photos/vqKnuG8GaQc/download?force=true&w=1920",
						"https://unsplash.com/photos/00ByEXKcSkA/download?force=true&w=1920",
						"https://unsplash.com/photos/A6idH5eRaLM/download?force=true&w=1920",
						"https://unsplash.com/photos/hYdikKrex4U/download?force=true&w=1920",
					]}
					nodeList={[
						<Test text={`image 1`}/>,
						<Test text={`image 2`}/>,
						<Test text={`image 3`}/>,
						<Test text={`image 4`}/>,
						<Test text={`image 5`}/>,
						<Test text={`image 6`}/>
					]}
				/>
			
			</div>
		</React.Fragment>
	);
}

export default App;
