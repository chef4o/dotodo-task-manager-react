export default function Contacts() {
    return (
        <div className="content contact">
            <h3>Contact</h3>
            <p>
                This website template has been designed by <a href="http://www.freewebsitetemplates.com/">Free
                    Website Templates</a> for you, for free. You can replace all this text with your own text.
                You can remove any link to our website from this website template, you're free to use this
                website template without linking back to us. If you're having problems editing this website
                template, then don't hesitate to ask for help on the <a
                    href="http://www.freewebsitetemplates.com/forums/">Forums</a>.
            </p>
            <form>
                <h4>Send Us A Quick Message</h4>
                <input type="text" value="Name *" onBlur="this.value=!this.value?'Name *':this.value;"
                    onFocus="this.select()" onClick="this.value='';" />
                <input type="text" value="Email Address *" onBlur="this.value=!this.value?'Email Address *':this.value;"
                    onFocus="this.select()" onClick="this.value='';" />
                <input type="text" value="Phone Number" onBlur="this.value=!this.value?'Phone Number':this.value;"
                    onFocus="this.select()" onClick="this.value='';" />
                <textarea name="comment" id="comment" cols="30" rows="10"
                    onBlur="this.value=!this.value?'Your Comment':this.value;" onFocus="this.select()"
                    onClick="this.value='';">Your Comment</textarea>
                <input type="submit" className="submit" value="Submit Message" />
            </form>
        </div>
    )
}