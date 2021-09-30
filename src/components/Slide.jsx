import React, {useCallback, useEffect, useState} from "react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi";

function Slide({imageList, nodeList, options}) {
	
	// OPTIONS
	// * imageList: array of image urls
	// * nodeList: array of elements, components shown on each image
	// * options: object | with default values:
	const {
		autoPlay = false,
		dot = true,
		nav = true,
		minHeight = "300px",
		imagesEachSlide = 1,
		backgroundImageGradientColor = "",
		backgroundColor = "rgba(0,0,0,0.2)",
		backgroundBlendMode = "darken",
	} = options
	
	// STATES
	const [activeIndex = 0, setActiveIndex] = useState()
	const [slideCount = 0, setSlideCount] = useState()
	
	// AUTOPLAY
	const handleAutoPlay = useCallback(() => {
		activeIndex + 1 === imageList.length ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
	}, [activeIndex, imageList.length])
	
	// USE EFFECTS
	useEffect(() => {
		// Option: autoPlay
		autoPlay && setTimeout(handleAutoPlay, 3000)
	}, [handleAutoPlay, autoPlay, options])
	
	useEffect(() => {
		let slideNumber = Math.round(imageList.length / imagesEachSlide)
		setSlideCount(slideNumber)
	},[imagesEachSlide, imageList])
	
	// HANDLE DOTS
	function Dots() {
		
		function Dot({index}) {
			return (
				<div
					key={index}
					className={`${activeIndex === index ? "bg-gray-800" : "bg-gray-50"} cursor-pointer m-1 h-2 w-2 rounded-full`}
					onClick={() => !autoPlay && setActiveIndex(index)}
				/>
			)
		}
		
		function handleDots() {
			let dots = [];
			for (let i = 0; i < slideCount; i++) {
				let dot = <Dot index={i} />
				dots.push(dot)
			}
			return dots
		}
		
		return (
			<div className="absolute right-10 bottom-1 left-10 flex flex-row flex-wrap justify-center items-center">
				{handleDots()}
			</div>
			)
	}
	
	// HANDLE NAVIGATION
	function Navigation() {
		
		const handlePrev = () => activeIndex - 1 === -1 ? setActiveIndex(slideCount - 1) : setActiveIndex(activeIndex - 1)
		const handleNext = () => activeIndex + 1 === slideCount ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
		
		return (
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
		)
	}
	
	// SLIDES WITH SINGLE IMAGE
	function SlideSingle() {
		return (
			<React.Fragment>
				{
					imageList.map((a, b) => {
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
										style={{minHeight: minHeight, height: minHeight}}
										className={`p-24`}
									>
										{nodeList[b]}
									</div>
								}
							
							</div>
						)
					})
				}
			</React.Fragment>
		)
	}
	
	// SLIDES WITH SINGLE IMAGE
	function SlideDouble() {
		
		let doubleImageList = []
		let doubleNodeList = []
		let nodeCount = 0
		
		for (let i = 0; i < imageList.length; i += 2) {
			let arr = [imageList[i], imageList[i + 1]]
			doubleImageList.push(arr)
		}
		
		for (let i = 0; i < nodeList.length; i +=2) {
			let arr = [nodeList[i], nodeList[i + 1]]
				doubleNodeList.push(arr)
		}
		
		
		return (
			<>
				{
					doubleImageList.map((a, b) => {
						return (
							<div className={`grid grid-cols-2 gap-1`}>
								
								{/*Slide 1*/}
								<div
									key={`slide1-img-${b}`}
									style={{
										backgroundImage: `url(${a[0]}) ${backgroundImageGradientColor && "," + backgroundImageGradientColor}`,
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
										<div
											key={`slide-node-1-${b}`}
											style={{minHeight: minHeight, height: minHeight}}
											className={`p-24`}
										>
											{nodeList[nodeCount]}
											{nodeCount++}
										</div>
									}
								
								</div>
								
								{/*Slide 2*/}
								<div
									key={`slide2-img-${b}`}
									style={{
										backgroundImage: `url(${a[1]}) ${backgroundImageGradientColor && "," + backgroundImageGradientColor}`,
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
										<div
											key={`slide-node-2-${b}`}
											style={{minHeight: minHeight, height: minHeight}}
											className={`p-24`}
										>
											{nodeList[nodeCount]}
											{nodeCount++}
										</div>
									}
								
								</div>
								
							</div>
						)
					})
				}
			</>
		)
	}
	
	return (
		<section>
			<div className="relative">
				
				{/*Slides*/}
				{
					imagesEachSlide === 1 ? <SlideSingle/> :
					imagesEachSlide === 2 ? <SlideDouble/> : ""
				}
				
				{/*Navigation*/}
				{ (nav && !autoPlay) && <Navigation /> }
				
				{/*Dots*/}
				{ dot && <Dots />}
			
			</div>
		</section>
	)
}

// built by me
// day of starting to code: 29/9/2021

export default Slide