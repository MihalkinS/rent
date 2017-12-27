export class Pagination {
    constructor(
                public page: number = 0,
                public total_pages: number = 0, 
                public total_results: number = 0
               ) {}
    public clear() {
        this.page = 0;
        this.total_pages = 0;
        this.total_results = 0;
    }
}