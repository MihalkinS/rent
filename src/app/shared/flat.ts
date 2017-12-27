export class Flat {
    constructor(
                public bedroom_number: number = -1,
                public bathroom_number: number = -1,
                public floor: number = -1,
                public car_spaces: number = -1,
                public img_url: string = "",
                public lister_url: string = "", // source link
                public price: number = -1,
                public property_type: string = "",
                public summary: string = "",
                public title: string = "",
                public thumb_url: string = "",
                public price_formatted: string = "",
                public updated_in_days_formatted: string = "",
                public favorite: boolean = false) {}
}