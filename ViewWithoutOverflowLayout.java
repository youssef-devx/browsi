public class ViewWithoutOverflowLayout extends ReactViewGroup {

    public ViewWithoutOverflowLayout(Context context) {
        super(context);

        setClipChildren(false);
        setClipToPadding(false);
    }

}