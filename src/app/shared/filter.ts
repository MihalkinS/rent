export class Filter {
    constructor(
                public toRent: boolean = true,
                public price_min: number = 0, 
                public price_max: number = 999999,
                public bedroom_min: number = 0,
                public bedroom_max: number = 999,
                public has_photo: boolean = true,
                public sorting_type: string = "relevancy") {}
}