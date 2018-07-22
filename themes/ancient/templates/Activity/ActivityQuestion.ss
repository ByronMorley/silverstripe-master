<div class="panel content activity-question" id="question-$ID" data-correct="$correctAnswerCount">
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
					<li class="panel aq-answer" id="answer-$ID" data-number="$Pos" data-answer="$CorrectAnswer">
					        <span class="section left">
                                <i class="fa fa-circle-o icon aq-answer-unselected" aria-hidden="true"></i>
                                <i class="fa fa-dot-circle-o icon aq-answer-selected" aria-hidden="true"></i>
                                <i class="fa fa-times icon aq-answer-incorrect" aria-hidden="true"></i>
                                <i class="fa fa-check icon aq-answer-correct" aria-hidden="true"></i>
                            </span>
						<span class="section left aq-answer-text">$Answer</span>
					</li>
                <% end_loop %>
			</ul>
		</div>
    <% end_if %>
	<div class="panel">
		<div class="section right">
			<button id="aq-confirm-$ID" class="inactive aq-confirm">Confirm</button>
			<button class="inactive aq-next" id="aq-next-$ID">Next</button>
		</div>
	</div>
</div>
