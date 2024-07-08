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
    TeachingAssistant = 'ta',
    Staff = 'staff',
    Aide = 'aide',
    Observer = 'observer',
    Parent = 'parent',
    Guardian = 'guardian',
    Designer = 'designer',
    Member = 'member'
}

export enum TokenSetType {
    Integration = 'integration',
    Person = 'person',
    Application = 'application'
};

export type BaseTokenSet = {
    type: TokenSetType;
    token_type?: 'Bearer';
    access_token: string;
    refresh_token?: string;
    context?: Record<string, any>;
};

/**
 * Important note: If you do not provide a refresh token the SDK will not be able to refresh the token for you and requests made an hour after the initial token exchange will fail
 */
export type PersonTokenSet = BaseTokenSet & {
    type: TokenSetType.Person;
    access_token?: string;
    refresh_token?: string;
    expires_in?: Date;
    expiration_date?: Date;
};

export type IntegrationTokenSet = BaseTokenSet & {
    type: TokenSetType.Integration;
    access_token: string;
};

export type TokenSet = PersonTokenSet | IntegrationTokenSet;

export type RequestOptionsPaging = {
    limit?: number;
    filter?: Record<string, any>;
} & RequestOptionsBase;

export type RequestOptionsBase = {
    expand?: string[];
    idempotency?: string;
};

export type RequestOptions = RequestOptionsPaging | RequestOptionsBase;

export enum ProductState {
    Active = 'active',
    Inactive = 'inactive',
    Upcoming = 'upcoming',
    Development = 'development',
    Sunsetting = 'sunsetting',
    Deprecated = 'deprecated'
};

export enum IntegrationState {
    Requested = 'requested',
    Inactive = 'inactive',
    Active = 'active',
    Error = 'error',
    Disabled = 'disabled',
    Paused = 'paused',
    Pending = 'pending',
    Scheduled = 'scheduled'
};

export type Integration = {
    state: IntegrationState;
    id: string;
    created_date: string;
    updated_date: string;
    permissions: string[];
    scope: string;
    start_date: string;
    end_date: string;
    locked: boolean;
    application_id: string;
    source_id: string;
    destination_id: string;
    region_id: string;
};

export enum SourceState {
    Inactive = 'inactive', // Waiting to be validated (set when configuration changes)
    Active = 'active', // First sync was successful, scheduled to sync regularly
    Error = 'error', // Validation or sync failed
    Disabled = 'disabled', // Disabled manually
    Destroyed = 'destroyed' // Basically just waiting for cleanup.
};

export type Source = {
    state: SourceState;
    id: string;
    created_date: string;
    updated_date: string;
    name: string;
    sync_interval: number;
    provider_id: string;
    properties: Record<string, any>;
    team_id: string;
    provider: {
        active: boolean;
        requires_administrator_login: boolean;
        requires_administrator_consent: boolean;
        requires_remote_configuration: boolean;
        allows_data_sync: boolean;
        id: string;
        name: string;
        application: string;
    }
};