export interface DefaultValues {
    numberOfPatientsSelector: string;
    ageCheckbox: boolean;
    ageFalsyValuesSlider: QuartersToHundred;
    genderCheckbox: boolean;
    genderFalsyValueSlider: QuartersToHundred;
    snomedCheckbox: boolean;
    snomedFalsyValueSlider: QuartersToHundred;
    dataCompletenessSlider: QuartersToHundred;
}

export type QuartersToHundred = 0 | 25 | 50 | 75 | 100;
