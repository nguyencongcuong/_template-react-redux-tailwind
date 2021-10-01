import React from 'react'
import Slidecy from "./components/Slidecy";

function Test({text}) {
	return (
		<div className={`flex justify-center text-center items-center h-full text-gray-50 text-xl font-bold`}>{text}</div>
	)
}

function App() {
	return (
		<React.Fragment>
			<div className={`h-screen bg-red-50`}>
				<Slidecy
					options={{
						autoPlay: false,
						minHeight: "50vh",
						imagesEachSlide: 1,
						backgroundImageGradientColor: "linear-gradient(217deg, hsla(260, 50%, 36%, 0.6) 35%, hsla(150, 30%, 30%, 0.8))",
						backgroundBlendMode: "screen",
					}}
					nodes={[
						["https://unsplash.com/photos/AsJirOOLN_s/download?force=true&w=1920", <Test text={`image 1`}/>],
						["https://unsplash.com/photos/6VPEOdpFNAs/download?force=true&w=1920", <Test text={`image 2`}/>],
						["https://unsplash.com/photos/vqKnuG8GaQc/download?force=true&w=1920"],
						["https://unsplash.com/photos/odKeTFsBDgE/download?force=true&w=1920", <Test text={`image 4`}/>],
						["https://unsplash.com/photos/A6idH5eRaLM/download?force=true&w=1920", <Test text={`image 5`}/>],
						["https://unsplash.com/photos/n4KewLKFOZw/download?force=true&w=1920"]
					]}
				/>
			
			</div>
		</React.Fragment>
	);
}

export default App;
