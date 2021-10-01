import React, {useCallback, useEffect, useState} from "react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi";

const _ = require("lodash")

function Slidecy({nodes, options}) {
	
	// OPTIONS
	// * nodes: two-dimensional array
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
		activeIndex + 1 === nodes.length ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
	}, [activeIndex, nodes.length])
	
	// USE EFFECTS
	useEffect(() => {
		// Option: autoPlay
		autoPlay && setTimeout(handleAutoPlay, 3000)
	}, [handleAutoPlay, autoPlay, options])
	
	useEffect(() => {
		let slideNumber = Math.round(nodes.length / imagesEachSlide)
		setSlideCount(slideNumber)
		console.log("active index: " + activeIndex)
	}, [imagesEachSlide, nodes, activeIndex])
	
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
				let dot = <Dot key={i} index={i}/>
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
	
	// HANDLE SLIDE
	function Slides() {
		
		let nodeChunk = _.chunk(nodes, imagesEachSlide)
		
		function Image({arraySingleImage}) { // [url, text]
			return (
				<div
					style={{
						backgroundImage: `url(${arraySingleImage[0]}) ${backgroundImageGradientColor && "," + backgroundImageGradientColor}`,
						backgroundBlendMode: backgroundBlendMode,
						backgroundColor: backgroundColor,
						minHeight: minHeight,
					}}
					className={`block animate-fadeIn bg-center bg-cover bg-no-repeat`}
				>
					{
						<div
							style={{minHeight: minHeight, height: minHeight}}
							className={`p-24`}
						>
							{arraySingleImage[1] && arraySingleImage[1]}
						</div>
					}
				</div>
			)
		}
		
		function Slide({arraySingleSlide}) {
			
			const slideItem = () => {
				let arr = []
				for (let i = 0; i < imagesEachSlide; i++) {
					let item = <Image key={i} arraySingleImage={arraySingleSlide[i]}/>
					arr.push(item)
				}
				return arr
			}
			
			return <div className={`grid grid-cols-${imagesEachSlide} gap-1`}>{slideItem()}</div>
		}
		
		return nodeChunk.map((a, i) => activeIndex === i && <Slide key={i} arraySingleSlide={nodeChunk[i]}/>)
	}
	
	return (
		<section>
			<div className="relative">
				
				{<Slides/>}
				{(nav && !autoPlay) && <Navigation/>}
				{dot && <Dots/>}
				
			</div>
		</section>
	)
}

// built by me
// day of starting to code: 29/9/2021

export default Slidecy