import { Gender, Race } from ".";

/**
 * 
 * @export
 * @interface Demographics
 */
export interface Demographics {
    /**
     * 
     * @type {Date}
     * @memberof Demographics
     */
    birthday: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Demographics
     */
    gender: Gender;
    /**
     * [Public School Residence Status Enum](https://ed.link/docs/api/v2.0/models/external/enums/public-school-residence-status)
     * @type {string}
     * @memberof Demographics
     */
    residence_status: ResidenceStatus;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    english_language_learner: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Demographics
     */
    country_if_birth: string | null;
    /**
     * 
     * @type {string}
     * @memberof Demographics
     */
    state_of_birth: string | null;
    /**
     * 
     * @type {string}
     * @memberof Demographics
     */
    city_of_birth: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    hispanic_or_latino_ethnicity: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Demographics
     */
    races: Race;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    homeless: boolean | null;
    /**
     * 
     * @type {any}
     * @memberof Demographics
     */
    disability: any | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    gifted_talented: boolean | null;
    /**
     * 
     * @type {any}
     * @memberof Demographics
     */
    food_service_program_eligibility: any | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    economically_disadvantaged: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    migrant: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    public_assistance: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    rural_residency: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof Demographics
     */
    individualized_educationPlan: boolean | null;
}
/**
    * @export
    * @enum {string}
    */
export enum ResidenceStatus {
    _01652 = '01652',
    _01653 = '01653',
    _01654 = '01654',
    _01655 = '01655',
    _01656 = '01656'
}
