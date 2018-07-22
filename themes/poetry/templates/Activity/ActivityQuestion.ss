<div class="panel content aq-activity aq-question-activity" id="activity-$ID" data-object="Question" data-correct="$correctAnswerCount">
	<div class="panel aq-question">
        $Question
	</div>
	<div class="panel">
		<div class="section right aq-rule">
			<span>$questionRuleText</span>
		</div>
	</div>
	<div class="panel aq-explanation">
	</div>
    <% if $Answers %>
		<div class="panel aq-answers">
			<ul>
                <% loop $Answers %>
					<li class="panel aq-selectable" id="answer-$ID" data-number="$Pos" data-answer="$CorrectAnswer">
                        <span class="section left aq-icons">
                            <!--Keep empty icons injected here -->
                        </span>
						<span class="section left aq-answer-text">
                            $Answer
						</span>
					</li>
                <% end_loop %>
			</ul>
		</div>
    <% end_if %>

</div>
