import {LOADER_DISPLAY_ON, LOADER_DISPLAY_OFF} from '../../types/types';

export function loaderOn() {
	return {
		type: LOADER_DISPLAY_ON,
	};
}

export function loaderOff() {
	return {
		type: LOADER_DISPLAY_OFF,
	};
}

