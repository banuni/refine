import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useModalForm } from "./useModalForm";
import { act } from "react-dom/test-utils";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts", route: "posts" }],
    routerInitialEntries: ["/resources/posts/create/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/resources/:resource/:action/:id">{children}</Route>
    </Wrapper>
);

describe("useModalForm Hook", () => {
    it("should load data to form with edit action", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useModalForm({
                    action: "edit",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        const { formProps, show } = result.current;

        act(() => {
            show(posts[0].id);
        });

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(formProps.form?.getFieldValue("title")).toEqual(posts[0].title);
    });
});