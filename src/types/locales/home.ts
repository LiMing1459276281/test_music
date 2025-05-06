export interface Home {
    title: string;
    subtitle: string;
    note: string;
    func_image_label: string;
    func_image_label1: string;
    func_model_label: string;
    func_model_list: { label: string, type: string }[];
    func_prompt_label: string;
    func_prompt_placeholder: string;
    func_text_label: string;
    func_text_placeholder: string;
    func_submit_label: string;
    example_title: string;
    example_link_label: string;
    donation_label: string;
    donation_about: string;
    public_label: string;
    credits_label: string;
    credits_buy_tips1: string;
    credits_buy_tips2: string;
    credits_buy_tips3: string;
    credits_buy_btn_label1: string;
    credits_buy_btn_label2: string;
    subscrible_tips1: string;
    usage: {
        usage_title: string;
        usage_subtitle1: string;
        usage_description1: string;
        usage_solution1: string;
        usage_subtitle2: string;
        usage_description2: string;
        usage_solution2: string;
        usage_subtitle3: string;
        usage_description3: string;
        usage_solution3: string;
    };
    customer: {
        title: string;
    };
    feature:{
        title: string;
        description: string;
        feature_list: { title: string, description: string, icon: string }[];
    };
    fqa: {
        title: string;
        description: string;
        list: { question: string, answer: string }[];
        fqa_note_label: string;
        fqa_link_label: string;
    };
    logs:{
        title: string;
        description: string;
    };
    blog:{
        title: string;
        description: string;
        blog_link: string;
    }
    meta:{
        title: string;
        description: string;
    }
}