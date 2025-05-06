import { Locale } from "@/i18n-config";
import { Home } from "@/types/locale";
export function UsageScenarios({ lang, dictionary }: { lang: Locale, dictionary: Home["usage"] }) {
    return (
        
            <div className="flex flex-col max-w-6xl md:mt-20 md:mb-20 mt-5 mb-5 px-4 w-full">
                <h2 className="dark:text-gray-200 font-bold text-3xl md:text-4xl lg:text-5xl mb-10 md:text-center">
                    {dictionary.usage_title}
                </h2>

                <div className="flex-col-reverse md:flex-row-reverse flex items-center justify-center md:gap-20 gap-5 mb-10 md:mb-20 md:mt-20 mt-5">
                    <div className="inline-flex flex-col items-center justify-center max-w-sm rounded bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
  
                        <img className="p-2"  src="/assets/photos.webp" alt="Old Photos and Artworks"/>
                        <p className="text-gray-700 dark:text-gray-400 px-4 mb-2">
                            This photo captures a family of four, with the background and clothing styles suggesting it was taken in the 1990s or early 2000s. The parents are holding their two children, all facing the camera with slightly serious expressions, a common pose for that era. The overall tone of the photo is yellowish, giving it a nostalgic feel and preserving precious memories of this family.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-gray-700 dark:text-gray-200 font-title font-semibold md:text-2xl text-xl mb-8">
                            {dictionary.usage_subtitle1}
                        </h3>
                        <p className="text-base text-gray-700 dark:text-gray-400 mb-4">
                            {dictionary.usage_description1}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {dictionary.usage_solution1}
                        </p>
                    </div>
                </div>

                <div className="flex-col-reverse md:flex-row flex items-center justify-center md:gap-20 mb-10 md:mb-20 gap-5">
                    <div className="inline-flex flex-col items-center justify-center max-w-sm rounded bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
           
                        <img className="p-2" src="/assets/blog/137cs.webp" alt="Data Chart Analysis"/>
                        <p className="text-gray-700 dark:text-gray-400 px-4 mb-2">
                            This chart illustrates the vertical distribution of radioactive Cesium-137 (¹³⁷Cs) in soil from Panchpokhari (2013) and Selin Co (2014 and 2017), showing an increase in ¹³⁷Cs with depth in Panchpokhari, likely due to erosion and weathering, and generally lower levels in Selin Co, reflecting different environmental processes at each location.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-gray-700 dark:text-gray-200 font-title font-semibold md:text-2xl text-xl mb-8">
                            {dictionary.usage_subtitle2}
                        </h3>
                        <p className="text-base text-gray-700 dark:text-gray-400 mb-4">
                            {dictionary.usage_description2}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {dictionary.usage_solution2}
                        </p>
                    </div>
                </div>

                <div className="flex-col-reverse md:flex-row-reverse flex items-center justify-center md:gap-20 mb-10 md:mb-5 gap-5">
                    <div className="inline-flex flex-col items-center justify-center max-w-sm rounded bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                
                                <video className="p-2" autoPlay muted loop preload="none" disablePictureInPicture webkit-playsinline="true" playsInline>
                                    <source src="https://r2.imagedescriptiongenerator.xyz/ImageAI.mp4" type="video/mp4"/>
                                    Ask Photos, Find the right content
                                </video>
             
                        <p className="text-gray-700 dark:text-gray-400 px-4 mb-2">
                            {`keys:Jade, Pendant, Prosperity
                            This is an icy jade pendant, intricately carved into three smooth, plump water droplets. The design is simple and elegant, with profound symbolism. The three cascading droplets represent the "Three Stars of Fortune" – Fu, Lu, and Shou – symbolizing happiness, prosperity, and longevity.`}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-gray-700 dark:text-gray-200 font-title font-semibold md:text-2xl text-xl mb-8">
                            {dictionary.usage_subtitle3}
                        </h3>
                        <p className="text-base text-gray-700 dark:text-gray-400 mb-4">
                            {dictionary.usage_description3}
                        </p>
                        <p className="text-base text-gray-700 dark:text-gray-400">
                            {dictionary.usage_solution3}
                        </p>
                    </div>
                </div>

            </div>

    )
}