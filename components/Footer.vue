<template>
    <div class="container_footer">
        <div class="content_footer">
            <div class="box_footer">
                <div class="section-title">
                    <span>Word Village</span>
                </div>
                <span>phanvu5.github.io/Books</span>
                <h3>Owner: Phan Minh Vu</h3>
                <p>
                    Email: <a href="mailto: phanminhvu_t65@hus.edu.vn">phanminhvu_t65@hus.edu.vn</a>
                    <br>
                    Copyright © 2023 PhanVu
                </p>
            </div>
            <div class="box_footer box_connect">
                <h2 class="connect">CONNECT</h2>
                <div class="connect_fnc">
                    <a href="https://www.facebook.com/vuphan.phan.56/" title="Facebook">
                        <img src="@/assets/logo/connect_face.png" alt="">
                    </a>
                    <a href="https://twitter.com/PhanV116211" title="Twitter">
                        <img src="@/assets/logo/connect_twiter.png" alt="">
                    </a>
                    <a href="https://www.instagram.com/beo_vuphan5/" title="Instagram">
                        <img src="@/assets/logo/connect_instagram.png" alt="">
                    </a>
                    <a href="https://www.linkedin.com/in/phan-v%C5%A9-353978290/" title="Linked In">
                        <img src="@/assets/logo/connect_linkedIn.png" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>

<style scoped>
.container_footer {
    position: relative;
    color: #2d2929;
    bottom: 0;
    min-height: 200px;
    height: 35vh;
    background: #7BB11D;
}

.content_footer{
    width: 80vw;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 0 auto;
}

.box_footer{
    display: grid;
    margin: 15px 0;
    width: 50%;
}

.box_connect{
    margin-top: 31px;
}

.section-title span {
    width: 21vw;
    margin-bottom: 8px;
    float: left;
    font-size: 35px;
    padding: 5px 0;
    color: #a5cbef;
    background: linear-gradient(to right, #ff8a00, #ff2070);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    font-weight: 700;
    border-bottom: 1px solid #da1b60 !important;
}

.connect {
    font-size: 20px;
    font-weight: 600;
    
}

.connect_fnc {
    display: flex;
    margin-top: 14px;
    flex-direction: row;
    
}

.connect_fnc>a>img {
    height: 40px;
    margin-right: 7px;
}
</style>
