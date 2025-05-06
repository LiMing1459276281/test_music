export interface Prompt {
    title: string;
    description: string;
    func_image_label: string;
    func_image_label1: string;
    func_model_label: string;
    func_model_list: { label: string, type: string }[];
    func_submit_label: string;
    public_label: string;
    credits_label: string;
    credits_buy_tips1: string;
    credits_buy_tips2: string;
    credits_buy_tips3: string;
    credits_buy_btn_label1: string;
    credits_buy_btn_label2: string;
    subscrible_tips1: string;
    result_label: string;
    use_title: string;
    use_description: string;
    use_step1: string;
    use_step1_des1: string;
    use_step1_des2: string;
    use_step1_des3: string;
    use_step1_des4: string;
    use_step1_des5: string;
    use_step2: string;
    use_step2_des1: string;
    use_step2_des2: string;
    use_step2_des3: string;
    use_step2_des4: string;
    use_step2_des5: string;
    use_step3: string;
    use_step3_des1: string;
    case_title: string;
    case1_title: string;
    case1_des: string;
    case2_title: string;
    case2_des: string;
    case3_title: string;
    case3_des: string;
    meta:{
        title: string;
        description: string;
    }
}