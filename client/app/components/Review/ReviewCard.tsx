import Ratings from '@/app/utils/Ratings';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

type Props = {
    item: any;
}



const ReviewCard = (props: Props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark'
    return (
        <div className={`w-full h-max pb-4  backdrop:blur border shadow-[bg-slate-700] rounded-lg p-3 shadow-inner ${isDark ? 'bg-black text-white border-white' : 'bg-white text-black'}`}>
            <div className={`flex w-full pt-5 `}>
                <Image
                    src={props.item.avatar}
                    alt=''
                    width={50}
                    height={50}
                    className={`w-[50px] h-[50px] rounded-full object-cover `}
                />
                <div className={`800px:flex justify-between w-full hidden`}>
                    <div className={`pl-4 `}>
                        <h5 className={`text-[20px] `}>{props.item.name} </h5>
                        <h6 className={`text-[16px]`}>{props.item.profession} </h6>
                    </div>
                    <Ratings rating={4} />
                </div>
                {/* for mobile */}
                <div className={`800px:hidden justify-between w-full flex flex-col `}>
                    <div className={`pl-4 `}>
                        <h5 className={`text-[20px] `}>
                            {props.item.name}
                        </h5>
                        <h6 className={`text-[16px]`}>{props.item.profession} </h6>
                    </div>
                    <Ratings rating={4} />
                </div>
            </div>
            <p className={`pt-2 px-2 font-Poppins`}>{props.item.comment} </p>
        </div>
    )
}

export default ReviewCard