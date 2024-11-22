"use client";
import CustomButton from "@/components/custom-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const getVideos = (index: number) => `/zentry/videos/hero-${index}.mp4`;

    const handleVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex((prev) => (prev % totalVideos) + 1);
    };

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) setIsLoading(false);
    }, [loadedVideos]);

    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => {
                        nextVideoRef.current?.play();
                    },
                });

                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true },
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: `polygon(14% 0, 72% 0, 90% 90%, 0% 100%)`,
            borderRadius: "0 0 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
            borderRadius: "0 0 0 0",
            duration: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            onClick={handleVideoClick}
                            className="origin-center scale-50 rounded-lg transition-all duration-500 ease-in hover:scale-100"
                        >
                            <video
                                id="current-video"
                                ref={nextVideoRef}
                                src={getVideos(upcomingVideoIndex)}
                                onLoadedData={handleVideoLoad}
                                loop
                                muted
                                className="size-64 origin-center scale-150 rounded-lg object-cover object-center"
                            />
                        </div>
                    </div>
                    <video
                        id="next-video"
                        ref={nextVideoRef}
                        src={getVideos(currentIndex)}
                        onLoadedData={handleVideoLoad}
                        loop
                        muted
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    />
                    <video
                        src={getVideos(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        onLoadedData={handleVideoLoad}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                    />
                </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>a</b>ming
                </h1>
                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redi<b>n</b>e
                        </h1>
                        <p className="mb-5 max-w-64 font-robert text-blue-100">
                            Enter the Metagame Layer <br />
                            Unleash the Play Economy
                        </p>
                        <CustomButton
                            leftIcon={<TiLocationArrow />}
                            id="watch-trailer"
                            className="flex-center gap-1 bg-yellow-300 text-black"
                        >
                            Watch Trailer
                        </CustomButton>
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>a</b>ming
            </h1>
        </div>
    );
}
