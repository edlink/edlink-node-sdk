/**
 * @export
 * @enum {string}
 */
export enum Subject {
    // CEDS Subjects
    LanguageArts = 'CEDS.01', // EnglishLanguageAndLiterature in CEDS
    Mathematics = 'CEDS.02',
    LifeAndPhysicalSciences = 'CEDS.03',
    SocialSciencesAndHistory = 'CEDS.04',
    VisualAndPerformingArts = 'CEDS.05',
    ReligiousEducationAndTheology = 'CEDS.07',
    PhysicalHealthAndSafetyEducation = 'CEDS.08',
    MilitaryScience = 'CEDS.09',
    InformationTechnology = 'CEDS.10',
    CommunicationAndAudioVisualTechnology = 'CEDS.11',
    BusinessAndMarketing = 'CEDS.12',
    Manufacturing = 'CEDS.13',
    HealthCareSciences = 'CEDS.14',
    PublicProtectiveAndGovernmentService = 'CEDS.15',
    HospitalityAndTourism = 'CEDS.16',
    ArchitectureAndConstruction = 'CEDS.17',
    AgricultureFoodAndNaturalResources = 'CEDS.18',
    HumanServices = 'CEDS.19',
    TransportationDistributionAndLogistics = 'CEDS.20',
    EngineeringAndTechnology = 'CEDS.21',
    Miscellaneous = 'CEDS.22',
    NonSubjectSpecific = 'CEDS.23',
    WorldLanguages = 'CEDS.24',

    // Edlink Subjects
    SpecialEducation = 'EL.01',
    ProfessionalDevelopment = 'EL.02'
}
/**
 * @export
 * @enum {string}
 */
export enum GradeLevel {
    Birth = 'Birth',
    Prenatal = 'Prenatal',
    InfantToddler = 'IT',
    Preschool = 'PR',
    Prekindergarten = 'PK',
    TransitionalKindergarten = 'TK',
    Kindergarten = 'KG',
    FirstGrade = '01',
    SecondGrade = '02',
    ThirdGrade = '03',
    FourthGrade = '04',
    FifthGrade = '05',
    SixthGrade = '06',
    SeventhGrade = '07',
    EighthGrade = '08',
    NinthGrade = '09',
    TenthGrade = '10',
    EleventhGrade = '11',
    TwelfthGrade = '12',
    GradeThirteen = '13',
    Postsecondary = 'PS',
    Ungraded = 'UG',
    Other = 'Other'
}

export interface Identifier {
    /**
     *
     * @type {string}
     * @memberof Identifier
     */
    type: string;
    /**
     *
     * @type {string}
     * @memberof Identifier
     */
    value: string;
}

//

/**
 * [Identifier Type](https://ed.link/docs/api/v2.0/models/external/enums/identifier-type)
 * @export
 * @enum {string}
 */
export enum IdentifierType {
    SIS = 'sis_id',
    State = 'state_id',
    School = 'school_id',
    Username = 'username',
    Email = 'email',
    LDAP = 'ldap',
    LTI = 'lti',

    Edlink = 'edlink_id',

    NCES = 'nces_id',
    MDR = 'mdr_id',
    IPEDS = 'ipeds_id',

    Aeries = 'aeries_id',
    Blackbaud = 'blackbaud_id',
    Blackboard = 'blackboard_id',
    Brightspace = 'brightspace_id',
    Bromcom = 'bromcom_id',
    Canvas = 'canvas_id',
    CanvasLti = 'canvas_lti_id',
    Clever = 'clever_id',
    Google = 'google_id',
    Illuminate = 'illuminate_id',
    Microsoft = 'microsoft_id',
    Moodle = 'moodle_id',
    OneRoster = 'oneroster_id',
    PowerSchool = 'powerschool_id',
    Schoology = 'schoology_id',
    Skyward = 'skyward_id'
}

/**
 * @export
 * @enum {string}
 */
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

/**
 * @export
 * @enum {string}
 */
export enum Race {
    AmericanIndianOrAlaskaNative = 'american-indian-or-alaska-native',
    Asian = 'asian',
    BlackOrAfricanAmerican = 'black-or-african-american',
    NativeHawaiianOrOtherPacificIslander = 'native-hawaiian-or-other-pacific-islander',
    White = 'white'
}

/**
 * @export
 * @enum {string}
 */
export enum Role {
    Student = 'student',
    DistrictAdministrator = 'district-administrator',
    Administrator = 'administrator',
    Teacher = 'teacher',
    Ta = 'ta',
    Aide = 'aide',
    Observer = 'observer',
    Parent = 'parent',
    Guardian = 'guardian',
    Designer = 'designer',
    Member = 'member'
}

export enum TokenSetType {
    Integration = 'integration',
    Person = 'person'
}

export type TokenSet = {
    type: TokenSetType;
    access_token: string;
    refresh_token?: string;
    expiration_date?: Date;
};

export type PersonTokenSet = TokenSet & {
    type: TokenSetType.Person;
    access_token?: string;
    refresh_token: string;
    expiration_date?: Date;
};

export type IntegrationTokenSet = TokenSet & {
    type: TokenSetType.Integration;
    access_token: string;
};

export type RequestOptions = {
    limit?: number;
    filter?: Record<string, any>;
    expand?: string[];
}