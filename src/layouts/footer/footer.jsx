import styles from './footer.module.scss'
function Footer() {


    return (
        <footer className={styles.footer}>
            <div class={styles.category}>
                <h6>Stay connected</h6>
                <div class={styles.socialIcons}>
                    <a href="/"><i class="fa-brands fa-facebook"></i></a>
                    <a href="/"><i class="fa-brands fa-twitter"></i></a>
                    <a href="/"><i class="fa-brands fa-instagram"></i></a>
                </div>
                <p>TechZilla, Inc.</p>
                <p>All Rights Reserved.</p>
                <p>Terms & Conditions</p>


            </div>
            <div class={styles.category}>
                <h6>Account</h6>
                <p>My Cart</p>
                <p>Orders</p>
                <p>Wish List</p>
                <p>Account</p>
            </div>

            <div class={styles.category}>
                <h6>FAQs</h6>
                <p>About TechZilla</p>
                <p>Payments</p>
                <p>Orders</p>
                <p>Shipping</p>
            </div>

            <div class={styles.category}>
                <h6>Contacts</h6>
                <p>Tel: 0800 222 44 88</p>
                <p>B2B Offers: b2b@techzilla.com</p>
                <p>214 Broadway, New York,  </p>
                <p>NY 10038, United States</p>

            </div>
        </footer>


    )
}

export default Footer