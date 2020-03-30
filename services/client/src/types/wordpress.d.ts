declare namespace wordpress {
    interface Post {
        id: number;
        date: string;
        date_gmt: string;
        guid: object;
        modified: object;
        modified_gmt: object;
        slug: string;
        status: string;
        type: string;
        link: string;
        title: {
            rendered: string;
        };
        content: {
            rendered: string;
            protected: boolean;
        };
        excerpt: {
            rendered: string;
            protected: boolean;
        };
        author: number;
        featured_media: number;
        comment_status: string;
        ping_status: string;
        sticky: boolean;
        template: string;
        format: string;
        meta: [];
        categories: [];
        tags: [];
        _links: object
    }
}