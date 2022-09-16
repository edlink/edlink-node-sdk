export interface Attachment {
    /**
     * 
     * @type {AttachmentType}
     * @memberof Attachment
     * @description The type of attachment.
     */
    type: AttachmentType;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The title of the attachment.
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The description of the attachment.
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The URL of the attachment if it is of the link type.
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     * @description The identifier of the file in the external system. Read-only, and only provided by some systems.
     */
    file_external_id?: string;
    /**
     * 
     * @type {number}
     * @memberof Attachment
     * @description The size of the file in bytes. Read-only, and only provided by some systems.
     */
    size?: number;
}


/**
 * @export
 * @enum {string}
 */
export enum AttachmentType {
    Link = 'link'
}