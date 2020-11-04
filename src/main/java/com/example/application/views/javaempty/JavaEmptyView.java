package com.example.application.views.javaempty;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "java-empty")
@PageTitle("Java-Empty")
@CssImport("./views/javaempty/java-empty-view.css")
public class JavaEmptyView extends Div {

    public JavaEmptyView() {
        setId("java-empty-view");
        add(new Label("Content placeholder"));
    }

}
