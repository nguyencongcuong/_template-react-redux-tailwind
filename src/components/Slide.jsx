import React, {useCallback, useEffect, useState} from "react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi";

function Slide({imageList, nodeList, options}) {
	
	// * imageList: array of image urls
	// * nodeList: array of elments, components shown on each image
	// * options: object | with default values:
	const {
		autoPlay = false,
		dot = true,
		nav = true,
		minHeight = "300px",
		backgroundImageGradientColor = "",
		backgroundColor = "rgba(0,0,0,0.2)",
		backgroundBlendMode = "darken",
	} = options
	
	const [activeIndex = 0, setActiveIndex] = useState()
	
	const handlePrev = () => activeIndex - 1 === -1 ? setActiveIndex(imageList.length - 1) : setActiveIndex(activeIndex - 1)
	const handleNext = () => activeIndex + 1 === imageList.length ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
	
	const handleAutoPlay = useCallback(() => {
		activeIndex + 1 === imageList.length ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
	}, [activeIndex, imageList.length])
	
	useEffect(() => {
		// Option: autoPlay
		autoPlay && setTimeout(handleAutoPlay, 3000)
	}, [handleAutoPlay, autoPlay, options])
	
	// SLIDES WITH SINGLE IMAGE
	function SlideSingle() {
		return (
			<React.Fragment>
			
			</React.Fragment>
		)
	}
	
	return (
		<section>
			<div className="relative">
				
				{/*Slides*/}
				{imageList.map((a, b) => {
					return (
						<div
							key={b}
							style={{
								backgroundImage: `url(${a}) ${backgroundImageGradientColor && "," + backgroundImageGradientColor}`,
								backgroundBlendMode: backgroundBlendMode,
								backgroundColor: backgroundColor,
								minHeight: minHeight,
							}}
							className={`
								${b === activeIndex ? "block animate-fadeIn" : "hidden"}
								bg-center bg-cover bg-no-repeat
							`}
						>
							
							{/*Elements on Each Slides*/}
							{
								nodeList[b] &&
								<div
									key={`node-${b}`}
									style={{ minHeight: minHeight, height: minHeight }}
									className={`p-24`}
								>
									{nodeList[b]}
								</div>
							}
							
							
						</div>
					)
				})}
				
				{/*Navigation*/}
				{
					(nav && !autoPlay) &&
					<div
						className="absolute top-10 right-10 bottom-10 left-10 flex flex-row flex-wrap justify-between items-center">
						<div
							className="flex justify-center items-center bg-gray-50 cursor-pointer opacity-90 rounded-full h-10 w-10 transition-all duration-500 hover:bg-gray-200 hover:opacity-100"
							onClick={handlePrev}>
							<HiArrowLeft/>
						</div>
						<div
							className="flex justify-center items-center bg-gray-50 cursor-pointer opacity-90 rounded-full h-10 w-10 transition-all duration-500 hover:bg-gray-200 hover:opacity-100"
							onClick={handleNext}>
							<HiArrowRight/>
						</div>
					</div>
				}
				
				{/*Dots*/}
				{
					dot &&
					<div className="absolute right-10 bottom-1 left-10 flex flex-row flex-wrap justify-center items-center">
						{
							imageList.map((a, b) =>
								<div
									key={b}
									className={`
										${activeIndex === b ? "bg-gray-800" : "bg-gray-50"}
										cursor-pointer m-1 h-2 w-2 rounded-full
									`}
									onClick={() => !autoPlay && setActiveIndex(b)}
								/>
							)
						}
					</div>
				}
			
			</div>
		</section>
	)
}

// built by me
// day of starting to code: 29/9/2021

export default Slide