public class ViewWithoutOverflowManager extends ViewGroupManager<ViewWithoutOverflowLayout> {

    @Override
     protected ViewWithoutOverflowLayout createViewInstance(ThemedReactContext reactContext) {
        return new ViewWithoutOverflowLayout(reactContext);
     }

    @Override
    public String getName() {
        return "ViewWithoutOverflow";
    }

}