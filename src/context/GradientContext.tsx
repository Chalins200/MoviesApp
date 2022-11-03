import React, { createContext, useState } from "react";

interface ImageColors{
	primary: string;
	secondary: string;
}

interface ContextProps {
	colors: ImageColors;
	prevColors: ImageColors;
	setMainColor: (colors: ImageColors) => void;
	setPrevMainColor: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ( { children }: any ) =>{

	const [colors, setColors] = useState<ImageColors>({
		primary: 'transparent',
		secondary: 'transparent'
	})

	const [prevColors, setPrevColors] = useState<ImageColors>({
		primary: 'transparent',
		secondary: 'transparent'
	})

	const setMainColor = ( colors: ImageColors ) => {
		setColors(colors);
	}

	const setPrevMainColor = ( colors: ImageColors ) => {
		setPrevColors(colors);
	}

return(
	<GradientContext.Provider value={{
		colors,
		prevColors,
		setMainColor,
		setPrevMainColor
	}}>
		{
			children
		}
	</GradientContext.Provider>

)

}